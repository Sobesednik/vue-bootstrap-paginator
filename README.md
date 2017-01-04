# vue-bootstrap-paginator
A Vue.js 2 component for simple pagination with Bootstrap layout

## Usage

The component has the following properties:

- _page_: current page
- _pages_: total number of pages
- _width_: maximum number of pages after which compact mode will be used
- _pageFn_: a function to generate href attribute for a page, e.g.,

```js
function pageFunction(page) {
    return `./${page}`
}
```

The component will emit `change` event with new page number when a user changes the page.

You can require the component in `Vue` components:

```vue
<template>
    <div class="parent-component">
        <pagination :page="1" :pages="15" :width="20" @change="onPageChange"></pagination>
    </div>
</template>
<script>
    const Pagination = require('vue-bootstrap-pagination')
    module.exports = {
        data: () => ({ ... }),
        props: [ ... ],
        components: { Pagination },
        methods: {
            onPageChange: function (page) {
                console.log('New page: %s', page)
            },
        },
    }
</script>
```

Or you can register `pagination` as a global component:

```js
const Vue = require('vue')
const Pagination = require('vue-bootstrap-pagination')
Vue.component('pagination', Pagination)
```
