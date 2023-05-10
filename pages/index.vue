<script lang="ts" setup async>
import {Ref} from 'vue';
import {ShortProduct} from '~/models/Product';
import {ProductsAPI} from "~/api/products";

useHead({
    title: 'Главная',
    meta: [
        {
            name: "description",
            content: "Оригинальные и лицензионные ключи активации продуктов Microsoft, Adobe, Office купить дешево"
        },
    ]
})
const products: Ref<ShortProduct[]> = ref([])

try {
    const {data} = await useAsyncData('products', async () => (await ProductsAPI.list()).data)
    if (data.value) {
        products.value = data.value.map((product: ProductsAPI.IShortProductResponse) => new ShortProduct(product))
    }
} catch (e) {
    throw createError({statusCode: 500, statusMessage: (e as Error).message})
}
</script>

<template>
    <LazyProductsList v-if="products.length"
                      :products="products"/>
</template>
