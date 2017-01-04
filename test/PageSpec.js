const Vue = require('vue')
const Page = require('../src/components/Page.vue');

function getElement(Component, propsData) {
    var Ctor = Vue.extend(Component)
    var vm = new Ctor({ propsData: propsData }).$mount()
    return $j(vm.$el)
}

describe('Page.vue', function () {
    describe('label', function () {
        it('should set the label based on p', function () {
            var el = getElement(Page, { p: 1 })
            expect(el.find('a')).toHaveText(1)
            var el2 = getElement(Page, { p: 2 })
            expect(el2.find('a')).toHaveText(2)
        })
        it('should set the label based on label', function () {
            var label = 'page1'
            var label2 = 'page2'
            var el = getElement(Page, { label: label, p: 1 })
            expect(el.find('a')).toHaveText(label)
            var el2 = getElement(Page, { label: label2, p: 2 })
            expect(el2.find('a')).toHaveText(label2)
        })
        it('should set the label based on next', function () {
            var nextLabel = '»'
            var label = 'page1'
            var label2 = 'page2'
            var el = getElement(Page, { next: true, label: label, p: 1 })
            expect(el.find('a')).toHaveText(nextLabel)
            var el2 = getElement(Page, { next: true, label: label2, p: 2 })
            expect(el2.find('a')).toHaveText(nextLabel)
        })
        it('should set the label based on prev', function () {
            var prevLabel = '«'
            var label = 'page1'
            var label2 = 'page2'
            var el = getElement(Page, { prev: true, label: label, p: 1 })
            expect(el.find('a')).toHaveText(prevLabel)
            var el2 = getElement(Page, { prev: true, label: label2, p: 2 })
            expect(el2.find('a')).toHaveText(prevLabel)
        })
        it('should set the label based on hellip', function () {
            var hellip = '…'
            var label = 'page1'
            var label2 = 'page2'
            var el = getElement(Page, { hellip: true, label: label, p: 1 })
            expect(el.find('span')).toHaveText(hellip)
            var el2 = getElement(Page, { hellip: true, label: label2, p: 2 })
            expect(el2.find('span')).toHaveText(hellip)
        })
    })

    describe('classes', function () {
        describe('disabled', function () {
            it('should be disabled if p is 0 and prev', function () {
                var el = getElement(Page, { prev: true, p: 0 })
                expect(el).toHaveClass('disabled')
            })
            it('should be disabled if disabled', function () {
                var el = getElement(Page, { disabled: true, p: 1 })
                expect(el).toHaveClass('disabled')
            })
            it('should be disabled if hellip', function () {
                var el = getElement(Page, { hellip: true, p: 1 })
                expect(el).toHaveClass('disabled')
            })
            it('should not be disabled otherwise', function () {
                var el = getElement(Page, { p: 1 })
                expect(el).not.toHaveClass('disabled')
            })
        })
        describe('hellip', function () {
            it('should have hellip class', function () {
                var el = getElement(Page, { hellip: true, p: 1 })
                expect(el).toHaveClass('hellip')
            })
            it('should not have hellip class', function () {
                var el = getElement(Page, { p: 1 })
                expect(el).not.toHaveClass('hellip')
            })
        })
        describe('active', function () {
            it('should have active class', function () {
                var el = getElement(Page, { active: true, p: 1 })
                expect(el).toHaveClass('active')
            })
            it('should not have active class', function () {
                var el = getElement(Page, { p: 1 })
                expect(el).not.toHaveClass('active')
            })
        })
    })

    describe('aria-label', function () {
        it('should set aria-label for prev', function () {
            var el = getElement(Page, { prev: true, p: 1 })
            expect(el.find('a')).toHaveAttr('aria-label', 'Previous')
        })
        it('should set aria-label for next', function () {
            var el = getElement(Page, { next: true, p: 2 })
            expect(el.find('a')).toHaveAttr('aria-label', 'Next')
        })
    })

    it('should emit click event', function (done) {
        var p = 1
        var Ctor = Vue.extend(Page)
        var vm = new Ctor({ propsData: { p: p } }).$mount()
        vm.$on('click', function (event) {
            expect(event).toEqual(p)
            done()
        })
        vm.onClick()
    })

    it('should use pageFn for href attrubute', function () {
        var pageFn = function pageFunction(page) {
            return './test-' + page
        }
        var page = 1
        var el = getElement(Page, { p: page, pageFn: pageFn })
        expect(el.find('a')).toHaveAttr('href', pageFn(page))
    })

    // it('should emit click event on a click', function (done) {
        // var p = 1
        // var Ctor = Vue.extend(Page)
        // var vm = new Ctor({ propsData: { p: p } }).$mount()
        // vm.$on('click', function (event) {
        //     expect(event).toEqual(p)
        //     done()
        // })
        // $j(vm.$el).find('a').trigger('click')
    // })

    // it('should set cursor:default !important to disabled span', function () {
    //     var el = getElement(Page, { disabled: true, p: 1 })
    //     console.log(el.find('span').css('cursor'))
    //     expect(el.find('span')).toHaveCss({ cursor: 'default !important' })
    // });
})
