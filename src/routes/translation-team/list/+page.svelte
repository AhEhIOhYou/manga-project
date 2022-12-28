<script lang="ts">
	import type { PageData } from '../../author/create/$types';
	import TranslationTeamInput from '@/lib/components/Input/TranslationTeamInput.svelte';
	import Button from '@/lib/components/Button.svelte';
	import type { TranslationTeamInfoType } from '@/lib/server/domain/entities';
	import { fly } from 'svelte/transition';
	import { quartIn } from 'svelte/easing';
	export let data: PageData;

	let translation_team;
	let teamInfo: TranslationTeamInfoType = {
		id: 0,
		name: '',
		members: []
	};
	let error;
	async function handleSubmit() {
		error = null;
		if (!translation_team.id) {
			error = 'Please select a team';
			return;
		}
		const response = await fetch('/api/method/translationteam.getInfo', {
			method: 'POST',
			body: JSON.stringify({ teamId: translation_team.id }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			teamInfo.id = translation_team.id;
			teamInfo.name = translation_team.name;
			body.members.forEach((member) => {
				teamInfo.members[teamInfo.members.length] = {
					id: member.id_user,
					name: member.users.username,
					avatar: member.users.avatar
				};
			});
			teamInfo.description = body.description;
		}
		error = body.message;
	}
</script>

<div class="container">
	<div class="title">Translation Teams Info</div>
	<div class="size-ruler">
		{#if error}
			<p class="error">{error}</p>
		{/if}
		<form class="form" on:submit|preventDefault={handleSubmit}>
			<TranslationTeamInput
				id={'translation_team'}
				name={'translation_team'}
				label={'Team'}
				required={true}
				bind:value={translation_team}
			/>
			<Button type="submit">Get Info</Button>
		</form>
	</div>
</div>

{#if teamInfo.id != 0}
	<div
		class="container"
		in:fly={{
			y: 20,
			delay: 50,
			easing: quartIn
		}}
	>
		<div class="team-info">
			<h2 class="team-info__title">{teamInfo.name}</h2>
			<p>{teamInfo.description}</p>
			<h3 class="team-info__subtitle">Members</h3>
			<ul class="team-info__member-list">
				{#each teamInfo.members as member, i}
					<li class="team-info__member">
						<div class="avatar">
							<img src="/favicon.png" width="45" height="45" alt={member.name} />
						</div>
						<div class="member-name">
							<a href="/user/{member.id}">{member.name}</a>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style lang="scss">
	.size-ruler {
		margin: 0 auto;
		width: 20rem;
	}
	.team-info {
		margin: 0 20px;
		width: 20rem;

		&__title {
			margin: 0;
			padding: 10px;
		}

		&__subtitle {
			margin: 0;
			padding: 10px;
		}

		&__member-list {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		&__member {
			margin: 0;
			padding: 10px;
			border: 2px solid var(--container-main-sub);
			border-radius: 5px;

			.avatar {
				display: inline-block;
				vertical-align: middle;
				margin-right: 10px;
			}

			.member-name {
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
</style>
