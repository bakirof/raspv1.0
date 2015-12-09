/**
 * Created by user on 17.09.15.
 */
export default function () {
    return {
        templateUrl: 'app/components/graph/graph.html',
        controller: 'GraphController',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'E'
    };
}
