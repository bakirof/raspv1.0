
export default function inputFile() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/grayscale-image/grayscale-image.html',
        link: (scope)=> {
            scope.startLoading = false;
            console.log(scope);
            scope.fileName = 'Поместить файл';
            function handleFileSelect(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var files = evt.dataTransfer.files;
                var reader = new FileReader();

                reader.onload = (function (theFile) {
                    return function (e) {
                        scope.fileName = theFile.name;
                        var tmp = e.target.result;

                        var newData = [];
                        scope.forCSV=[];
                        tmp.forEach(item=> {
                            console.log(item);
                            if (item){
                                var _tmp = item.split(';');
                                newData.push({x: parseFloat(_tmp[0]), y: parseFloat(_tmp[1])});
                                scope.forCSV.push([parseFloat(_tmp[0]), parseFloat(_tmp[1])]);
                            }
                        });
                        scope.points = newData;
                        scope.updateChart(scope.points);
                        console.log(newData);
                        scope.startLoading = false;
                        scope.$apply();
                    };
                })(files[0]);
                reader.onloadstart = function(e) {
                    scope.startLoading = true;
                    scope.$apply()

                };
                reader.onprogress = updateProgress;

                function updateProgress(evt) {
                    // evt is an ProgressEvent.
                    if (evt.lengthComputable) {
                        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                        // Increase the progress bar length.
                        if (percentLoaded < 100) {
                            scope.determinateValue = percentLoaded;
                        }
                    }
                    scope.$apply()
                }

                // Read in the image file as a data URL.
                reader.readAsDataURL(files[0]);

            }

            function handleDragOver(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy';
                $('#drop-zone').css('color', 'white');
                $('#drop-zone').css('border-color', 'white');
                $('#drop-zone').onmouseout(()=>{
                    $('#drop-zone').css('color', '#00ACC1');
                    $('#drop-zone').css('border-color', '#00ACC1');
                });
            }


            // Setup the dnd listeners.
            var dropZone = document.getElementById('drop-zone');
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', handleFileSelect, false);
        }
    };

}
