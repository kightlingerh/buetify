<template>
	<section :id="slug" class="example-section">
		<router-link v-if="title" :to="`#${slug}`">
			<b-title> # {{ title }} </b-title>
		</router-link>
		<div v-if="$slots.content" class="content" :class="{ 'margin-top-size-6': title }">
			<slot name="content"></slot>
		</div>
		<div class="example" :class="{ 'is-vertical': isVertical }">
			<div class="example-component">
				<slot name="component"></slot>
			</div>
			<code-view class="code-view" :code="code" is-bordered> </code-view>
		</div>
	</section>
</template>

<script lang="ts">
import { BTitle } from 'buetify/lib/components';
import { defineComponent, computed } from 'vue';
import { useSlug } from '../../shared/composables';
import CodeView from '../codeView/CodeView.vue';
export default defineComponent({
	name: 'example-view',
	components: {
		BTitle,
		CodeView
	},
	props: {
		title: {
			type: String,
			required: false
		},
		code: {
			type: String,
			required: true
		},
		isVertical: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return {
			slug: useSlug(computed(() => props.title || ''))
		};
	}
});
</script>

<style lang="scss">
// from buefy
.example {
	position: relative;
	display: flex;
	flex-direction: column;
	border: 1px solid $warning;
	border-top-right-radius: $radius;
	border-bottom-right-radius: $radius;
	border-bottom-left-radius: $radius;
	color: rgba(0, 0, 0, 0.7);
	.button-container {
		position: absolute;
		display: inline-flex;
		background: $warning;
		border-radius: $radius $radius 0 0;
		bottom: 100%;
		right: -1px;
		padding: 0 0 0 8px;
		vertical-align: top;
		.button {
			display: flex;
			align-items: flex-end;
			font-size: 11px;
			padding: 0;
			text-decoration: none;
			&:not(:last-child) {
				margin-right: 0.5rem;
			}
			.icon {
				margin-left: 0 !important;
			}
			&:hover,
			&:focus {
				color: $link;
				background: transparent;
			}
		}
	}
	&:not(:first-child) {
		margin-top: 2.5rem;
	}
	&:not(:last-child) {
		margin-bottom: 1.5rem;
	}
	&:before {
		background: $warning;
		border-radius: $radius $radius 0 0;
		bottom: 100%;
		content: 'Example';
		display: inline-block;
		font-size: 8px;
		font-weight: $weight-bold;
		left: -1px;
		padding: 4px 8px;
		position: absolute;
		text-transform: uppercase;
		vertical-align: top;
	}
	.example-component {
		padding: 1.5rem;
	}
	.codeview {
		border-top: 1px solid $warning;
	}
	&.is-vertical {
		@include desktop {
			flex-direction: row;
			.example-component,
			.codeview {
				width: 50%;
			}
			.codeview {
				display: flex;
				flex-direction: column;
				border-top: 0;
				border-left: 1px solid $warning;
			}
			.codeview,
			.highlight,
			pre,
			code {
				flex-grow: 1;
			}
		}
	}
}

hr.is-medium {
	margin: 3rem 0;
}
</style>
