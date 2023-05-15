<script lang="ts" setup>
import {PageAPI} from "~/api/page";

const pages = ref([])
const {data} = await useAsyncData('pages', async () => await PageAPI.list())

pages.value = data.value.data
</script>

<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <nav v-if="pages.length"
                 class="footer__block">
                <h4 class="footer__block-heading">Ссылки</h4>
                <NuxtLink v-for="page in pages"
                          class="footer__link"
                          :to="{ name: 'page', params: { page: page.attributes.slug } }">
                    {{ page.attributes.title }}
                </NuxtLink>
            </nav>
            <div class="footer__block">
                <h4 class="footer__block-heading">Платежные методы</h4>
                <img src="http://localhost:1337/uploads/logo3h_e0ff0b90df.png" alt="Платежные методы"/>
            </div>
            <div class="footer__block">
                <h4 class="footer__block-heading">Контакты</h4>
                <a class="footer__contact-link" targer="_blank" href="https://t.me/keyscenterru">
                    <svg class="footer__contact-link-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                        <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8
                        ,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948
                        ,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485
                        -16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s
                        -3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888
                        -5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248
                        ,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452
                        ,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z" fill="currentColor"/>
                    </svg>
                    @keyscenterru</a>
                <a class="footer__contact-link" targer="_blank" href="mailto:support@keyscenter.ru">
                    <svg class="footer__contact-link-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8
                        -7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4
                         31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3
                         -28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" fill="currentColor"/></svg>
                    support@keyscenter.ru</a>
            </div>
        </div>
        <div class="footer__copyright">
            © KEYSCENTER.RU, 2023. Оригинальные и лицензионные ключи активации продуктов Microsoft, Adobe, Office купить дешево.
            Лицензии по самым выгодным ценам.
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
  @apply w-full flex flex-col py-20 gap-12;

  &__contact-link {
    @apply flex gap-2 items-center;

    &-image {
      @apply h-5;
    }
  }

  &__wrapper,
  &__copyright {
    @apply container mx-auto flex flex-row justify-between;
  }

    &__copyright {
        @apply text-gray-500;
    }

  &__block {
    @apply flex flex-col gap-1;

    &-heading {
      @apply font-bold mb-2;
    }
  }
}
</style>
