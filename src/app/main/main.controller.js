class MainController {
  constructor($scope, FileSaver) {
    'ngInject';

    $scope.power = ()=> {
      $scope.pereschet();
    };

    $scope.changedInputField = ()=> {
      if (parseFloat($scope.a1) && parseFloat($scope.a2) && parseFloat($scope.a3) && parseFloat($scope.b1)
        && parseFloat($scope.b2) && parseFloat($scope.b3) && parseFloat($scope.xo) && parseFloat($scope.xk)
        && parseFloat($scope.dx)) {
        $scope.power()
      }
    };
    $scope.updateX = (index, value)=> {
      value = parseFloat(value);
      if (typeof value === 'number') {
        $scope.data[0].values[index].x = value;
        $scope.api.updateWithData($scope.data);
      }
    };

    $scope.updateY = (index, value)=> {
      value = parseFloat(value);
      if (typeof value === 'number') {
        $scope.data[0].values[index].y = value;
        $scope.api.updateWithData($scope.data);
      }
    };

    $scope.updateChart = (points)=> {
      $scope.data = [
        {
          key: "График",
          values: points
        }
      ];
      $scope.api.updateWithData($scope.data);
      $scope.$apply();
    };


    $scope.pereschet = ()=> {
      if (parseFloat($scope.dx)) {
        $scope.points = [];
        $scope.forCSV = [];
        for (var i = parseFloat($scope.xo); i < parseFloat($scope.xk); i += parseFloat($scope.dx)) {
          var point = {};
          point.x = Math.round(parseFloat(i) * 1000) / 1000;
          point.y = Math.round(parseFloat($scope.a1) * Math.sin(parseFloat(parseFloat($scope.b1)) * point.x) + parseFloat($scope.a2) * Math.sin(parseFloat($scope.b2) * point.x) + parseFloat($scope.a3) * Math.sin(parseFloat($scope.b3) * point.x) * 100) / 100;
          $scope.points.push(point);
          $scope.forCSV.push([point.x, point.y]);
        }

        $scope.fileName = 'Поместить файл';

        $scope.updateChart($scope.points);
      }
    };
    $scope.saveFile = ()=> {
      $scope.points.forEach(point=> {
        point.x = parseFloat(point.x);
        point.y = parseFloat(point.y);
        delete point['series'];
      });
      $scope.forCSV = this.ConvertToCSV($scope.points);
      var config = {
        data: [$scope.forCSV],
        filename: 'graph.txt',
        options: {
          type: 'text/plain;charset=utf-8'
        }
      };
      FileSaver.saveAs(config);
    }

  }

  ConvertFormCSV() {

  }

;

  ConvertToCSV(objArray) {
    var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line !== '') line += ';';

        line += array[i][index];
      }
      if (i === array.length - 1) {
        str += line;
      } else {
        str += line + '\r\n';
      }
    }

    return str;
  }
}
export default MainController;
