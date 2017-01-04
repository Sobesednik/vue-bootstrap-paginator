<template>
    <li :class="classObject">
        <span v-if="_disabled">{{ _label }}</span>
        <a v-else :href="_pageFn(p)" @click.prevent="onClick" :aria-label="getAriaLabel()">{{ _label }}</a>
    </li>
</template>

<script>
module.exports = {
    computed: {
        classObject: function () {
            return {
                active: this.active,
                hellip: this.hellip,
                disabled: this._disabled,
            }
        },
        _disabled: function () {
            return this.disabled || this.hellip || (this.prev && this.p === 0)
        },
        _label: function () {
            if (this.hellip) {
                return '…'
            }
            if (this.prev) {
                return '«'
            }
            if (this.next) {
                return '»'
            }
            if (this.label) {
                return this.label
            }
            return this.p
        }
    },
    methods: {
        onClick: function () {
            this.$emit('click', this.p)
        },
        getAriaLabel: function () {
            if (this.prev) {
                return 'Previous'
            }
            if (this.next) {
                return 'Next'
            }
        },
        _pageFn: function (page) {
            if (typeof this.pageFn === 'function') {
                return this.pageFn(page)
            }
            return '#'
        }
    },
    props: [ 'p', 'disabled', 'active', 'label', 'next', 'prev', 'hellip', 'pageFn' ],
}
</script>
<style scoped>
    li.disabled > span {
        cursor: default !important
    }
</style>
