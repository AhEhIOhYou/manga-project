<script lang="ts">
	import Button from '@/lib/components/Button.svelte';
	import Datalist from '@/lib/components/Input/Datalist.svelte';
	import Select from '@/lib/components/Input/Select.svelte';
	import ShowcaseTile from '@/lib/components/ShowcaseTile.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const title: string = data.user ? data.user.name : 'master';

	const states = [
		{ value: 'AL', display: 'Alabama' },
		{ value: 'AK', display: 'Alaska' },
		{ value: 'AZ', display: 'Arizona' },
		{ value: 'AR', display: 'Arkansas' },
		{ value: 'CA', display: 'California' },
		{ value: 'CO', display: 'Colorado' },
		{ value: 'CT', display: 'Connecticut' },
		{ value: 'DE', display: 'Delaware' },
		{ value: 'DC', display: 'District Of Columbia' },
		{ value: 'FL', display: 'Florida' },
		{ value: 'GA', display: 'Georgia' },
		{ value: 'HI', display: 'Hawaii' },
		{ value: 'ID', display: 'Idaho' },
		{ value: 'IL', display: 'Illinois' },
		{ value: 'IN', display: 'Indiana' },
		{ value: 'IA', display: 'Iowa' },
		{ value: 'KS', display: 'Kansas' },
		{ value: 'KY', display: 'Kentucky' },
		{ value: 'LA', display: 'Louisiana' },
		{ value: 'ME', display: 'Maine' },
		{ value: 'MD', display: 'Maryland' },
		{ value: 'MA', display: 'Massachusetts' },
		{ value: 'MI', display: 'Michigan' },
		{ value: 'MN', display: 'Minnesota' },
		{ value: 'MS', display: 'Mississippi' },
		{ value: 'MO', display: 'Missouri' },
		{ value: 'MT', display: 'Montana' },
		{ value: 'NE', display: 'Nebraska' },
		{ value: 'NV', display: 'Nevada' },
		{ value: 'NH', display: 'New Hampshire' },
		{ value: 'NJ', display: 'New Jersey' },
		{ value: 'NM', display: 'New Mexico' },
		{ value: 'NY', display: 'New York' },
		{ value: 'NC', display: 'North Carolina' },
		{ value: 'ND', display: 'North Dakota' },
		{ value: 'OH', display: 'Ohio' },
		{ value: 'OK', display: 'Oklahoma' },
		{ value: 'OR', display: 'Oregon' },
		{ value: 'PA', display: 'Pennsylvania' },
		{ value: 'RI', display: 'Rhode Island' },
		{ value: 'SC', display: 'South Carolina' },
		{ value: 'SD', display: 'South Dakota' },
		{ value: 'TN', display: 'Tennessee' },
		{ value: 'TX', display: 'Texas' },
		{ value: 'UT', display: 'Utah' },
		{ value: 'VT', display: 'Vermont' },
		{ value: 'VA', display: 'Virginia' },
		{ value: 'WA', display: 'Washington' },
		{ value: 'WV', display: 'West Virginia' },
		{ value: 'WI', display: 'Wisconsin' },
		{ value: 'WY', display: 'Wyoming' }
	];
</script>

<svelte:head>
	<title>Welcome home, {title}!</title>
</svelte:head>

<div class="container">
	<div class="title">Test Page</div>
	<ShowcaseTile items={data.books} />
	<Button type="btn">
		<a href="/book/create">Create book</a>
	</Button>
	<Button type="btn">
		<a href="/author/create">Create Author</a>
	</Button>
	<Button type="btn">
		<a href="/translation-team/create">Create Translation Team</a>
	</Button>
	<form class="form">
		<Datalist id={'author'} name={'author'} label={'Author'} required={true} options={states} />
	</form>
</div>
