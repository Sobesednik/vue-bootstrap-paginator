const Vue = require('vue')
const Pagination = require('../src/components/Pagination.vue');

function getElement(Component, propsData) {
    var Ctor = Vue.extend(Component)
    var vm = new Ctor({ propsData: propsData }).$mount()
    return $j(vm.$el)
}

describe('Pagination.vue', function () {
    it('should have default width of 7', function () {
        var Ctor = Vue.extend(Pagination)
        var vm = new Ctor().$mount()
        expect(vm.width).toEqual(7)
    })
    it('should emit change event', function (done) {
        var p = 5
        var Ctor = Vue.extend(Pagination)
        var vm = new Ctor({ propsData: { pages: 10, page: p, width: 11 } }).$mount()
        vm.$on('change', function (event) {
            expect(event).toEqual(p)
            done()
        })
        vm.onClick(p)
    })
    // it('should emit change event on click', function (done) {
    //     var p = 5
    //     var Ctor = Vue.extend(Pagination)
    //     var vm = new Ctor({ propsData: { pages: 10, page: p, width: 11 } }).$mount()
    //     var el = $j(vm.$el)
    //     vm.$on('change', function (event) {
    //         expect(event).toEqual(p)
    //         done()
    //     })
    //     el.find('.active').find('a').click()
    // })

    describe('full template', function () {
        var el
        beforeEach(function () {
            el = getElement(Pagination, { pages: 10, page: 5, width: 11 })
        })
        it('should have links to pages', function () {
            expect(el).toEqual('ul')
            expect(el).toHaveClass('pagination')
            var lis = el.find('li')
            expect(lis).toHaveLength(12)
        })
        it('should have link to prev page', function () {
            var li = el.find('li').first()
            expect(li.find('a')).toHaveText('«')
        })
        it('should have link to the next page', function () {
            var li = el.find('li').last()
            expect(li.find('a')).toHaveText('»')
        })
        it('should have correct links', function () {
            var lis = el.find('li').not(':first').not(':last')
            lis.each(function eachLi(index) {
                var expectedIndex = index + 1
                expect($j(this)).toHaveText(expectedIndex)
            })
        })
        it('should disable prev link when on first page', function () {
            el = getElement(Pagination, { pages: 10, page: 1, width: 11 })
            var li = el.find('li').first()
            expect(li).toHaveClass('disabled')
        })
        it('should disable next link when on last page', function () {
            el = getElement(Pagination, { pages: 10, page: 10, width: 11 })
            var li = el.find('li').last()
            expect(li).toHaveClass('disabled')
        })

        describe('page function', function () {
            var page
            var pageFn

            beforeEach(function () {
                page = 5
                pageFn = function pageFunction(page) {
                    return './test-' + page
                }
                el = getElement(Pagination, { pages: 10, page: page, width: 11, pageFn: pageFn })
            })
            it('should use page function', function () {
                var aEls = el.find('li').find('a').not(':first').not(':last')
                aEls.each(function eachLi(index) {
                    var expectedIndex = index + 1
                    var expectedPage = pageFn(expectedIndex)
                    expect($j(this)).toHaveAttr('href', expectedPage)
                })
            })
            it('should use page function on prev and next links', function () {
                var firstA = el.find('li').find('a').first()
                var lastA = el.find('li').find('a').last()
                expect(firstA).toHaveAttr('href', pageFn(page - 1))
                expect(lastA).toHaveAttr('href', pageFn(page + 1))
            })
            it('should set # as href when page function is not given', function () {
                el = getElement(Pagination, { pages: 10, page: page, width: 11 })
                var aEls = el.find('li').find('a')
                aEls.each(function eachLi(index) {
                    expect($j(this)).toHaveAttr('href', '#')
                })
            })
        })
    })

    // need more tests for edge cases
    // oh how testing html is fun
    describe('narrow template', function () {
        var el
        beforeEach(function () {
            el = getElement(Pagination, { pages: 20, page: 10, width: 10 })
        })
        it('should display current page', function () {
            var li = el.find('.active')
            expect(li).toHaveText('10')
        })
        it('should display 2 pages around current', function () {
            var li = el.find('.active')
            expect(li.prev()).toHaveText('9')
            expect(li.next()).toHaveText('11')
        })
        it('should display right hellip', function () {
            var li = el.find('.active')
            expect(li.next().next()).toHaveText('…')
        })
        it('should display left hellip', function () {
            var li = el.find('.active')
            expect(li.prev().prev()).toHaveText('…')
        })
        it('should display first page link', function () {
            var li = el.find('.active')
            expect(li.prev().prev().prev()).toHaveText('1')
        })
        it('should display last page link', function () {
            var li = el.find('.active')
            expect(li.next().next().next()).toHaveText('20')
        })
        it('should display prev link', function () {
            var li = el.find('li').first()
            expect(li.find('a')).toHaveText('«')
        })
        it('should display next link', function () {
            var li = el.find('li').last()
            expect(li.find('a')).toHaveText('»')
        })
    })
})
