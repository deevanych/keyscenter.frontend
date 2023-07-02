<script lang="ts" setup>
  interface IProps {
    platforms: string[]
  }

  const props = defineProps<IProps>()
</script>

<template>
	<div class="product-platform">
		<PlatformsSprite/>
		<svg v-for="platform in props.platforms"
				 :key="platform"
				 class="product-platform__icon">
			<use :xlink:href="`#${platform.toLowerCase()}`"></use>
		</svg>
	</div>
</template>

<style lang="scss" scoped>
  .product-platform {
		@apply flex gap-2;
		
		&__icon {
			width: 16px;
			height: 16px;
		}
	}
</style>
