<template>
    <ul class="pagination">
        <!--up to width-->
        <template v-if="pages < width">
            <page :p="page - 1" prev="true" @click="onClick" :pageFn="pageFn"></page>
            <page v-for="n in pages" :p="n" :active="page === n" @click="onClick" :pageFn="pageFn"></page>
            <page :p="page + 1" next="true" :disabled="page === pages" @click="onClick":pageFn="pageFn"></page>
        </template>

        <!--more pages than width-->
        <template v-else>
            <page :p="page - 1" prev="true" @click="onClick" :pageFn="pageFn"></page>
            <page :p="1" v-if="page > 2" @click="onClick" :pageFn="pageFn"></page>

            <page :p="2" v-if="page === 4" @click="onClick" :pageFn="pageFn"></page>
            <page v-else-if="page > 4" :hellip="true" :pageFn="pageFn"></page>

            <page :p="page - 1" v-if="page > 1" @click="onClick" :pageFn="pageFn"></page>
            <page :p="page" active="true" @click="onClick" :pageFn="pageFn"></page>
            <page :p="page + 1" v-if="page < pages" @click="onClick" :pageFn="pageFn"></page>

            <page :p="page + 2" v-if="pages - page === 3" @click="onClick" :pageFn="pageFn"></page>
            <page v-else-if="pages - page > 3" :hellip="true" :pageFn="pageFn"></page>

            <page :p="pages" v-if="pages - page > 1" @click="onClick" :pageFn="pageFn"></page>

            <page :p="page + 1" next="true" :disabled="page === pages" @click="onClick" :pageFn="pageFn"></page>
        </template>
    </ul>
</template>

<script>
    const Page = require('./Page.vue')

    module.exports = {
        props: {
            page: {
                type: Number,
                default: 1,
            },
            pages: {
                type: Number,
            },
            width: {
                type: Number,
                default: 7,
            },
            pageFn: {
                type: Function,
            }
        },
        methods: {
            onClick: function (event) {
                this.$emit('change', event)
            }
        },
        components: { page: Page }
    }
</script>
