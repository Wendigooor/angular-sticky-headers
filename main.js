var myApp = angular.module('myApp', []);

myApp.controller("MyCtrl", function MyCtrl($scope) {
    $scope.sections = [];
    for (var i = 0; i < 10; i++) {
        $scope.sections.push({
            title: "Section " + (i + 1),
            content: "Some content. Lorem ipsum dolor sit amet."
        });
    }

    $scope.lastHeaderTopValue = 0;
    $scope.globalCount = 0;
    $scope.sectionsHeaders = [];
})

.directive("scroll", function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            count = 0;
            headers = $('.section-header')
            headerHeight = 36 // $(headers[0]).height()
            pageOffset = this.pageYOffset + headerHeight * scope.globalCount

            headers.each(function (index, el) {
                if ($(el).offset().top <= pageOffset) {
                    count += 1;
                }
                scope.sectionsHeaders[index] = $(el).offset().top + index * headerHeight
            })
            Object.freeze(scope.sectionsHeaders)

            scope.lastHeaderTopValue = scope.sectionsHeaders[scope.globalCount]

            if (count > 1 && count <= scope.globalCount) {
                if (pageOffset + headerHeight * (scope.globalCount - 2) < scope.sectionsHeaders[scope.globalCount - 1]) {
                    count -= 1
                    scope.globalCount = -1
                }
            }
            scope.globalCount = Math.max(count, scope.globalCount)

            headers.each(function (index, el) {
                if (index < scope.globalCount) {
                    $(el).css('top', (index) * headerHeight)
                    $(el).css('position', 'fixed')
                } else {
                    $(el).removeAttr('style');
                }
            })
            if (scope.globalCount == 1 && $(headers[0]).offset().top == 0) {
                $(headers[0]).removeAttr('style');
            }
        });
    };
})
