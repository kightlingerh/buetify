<template>
	<header>
		<nav v-if="crumbs.length" class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li v-for="(crumb, index) in crumbs" :key="crumb" :class="{ 'is-active': index === crumbs.length - 1 }">
					<router-link :to="meta[crumb].fullPath">
						{{ meta[crumb].title }}
					</router-link>
				</li>
			</ul>
		</nav>
		<div>
			<b-title>
				{{ title }}
			</b-title>
			<p v-text="subtitle"></p>
		</div>
	</header>
</template>

<script lang="ts">
import 'bulma/sass/components/breadcrumb.sass';
import BTitle from 'buetify/lib/components/title/BTitle';
import { pipe } from 'fp-ts/lib/function';
import { fromNullable, getOrElse, mapNullable, Option } from 'fp-ts/lib/Option';
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { BuetifyRouteMeta } from '../../../shared/types';
import { constEmptyArray, constEmptyString } from '../../../shared/utils';
import { meta } from '../index';

export default defineComponent({
	name: 'documentation-header',
	components: {
		BTitle
	},
	setup() {
		const route = useRouter().currentRoute;
		const routeMeta = computed<Option<Partial<BuetifyRouteMeta>>>(() => fromNullable(route.value.meta || {}));
		const title = computed(() =>
			pipe(
				routeMeta.value,
				mapNullable(m => m.title),
				getOrElse(constEmptyString)
			)
		);
		const subtitle = computed(() =>
			pipe(
				routeMeta.value,
				mapNullable(m => m.subtitle),
				getOrElse(constEmptyString)
			)
		);
		const crumbs = computed(() =>
			pipe(
				routeMeta.value,
				mapNullable(m => m.breadcrumbs),
				getOrElse<string[]>(constEmptyArray)
			)
		);

		return {
			title,
			subtitle,
			crumbs,
			meta
		};
	}
});
</script>
