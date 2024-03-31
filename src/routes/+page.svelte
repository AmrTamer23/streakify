<script lang="ts">
	import { Button } from '../lib/components/ui/button';
</script>

<nav class="flex justify-between items-center">
	<span class="font-semibold font-pt-mono text-3xl text-[#FFC278] pointer-events-none select-none">
		Streakify
	</span>
	<ul class="flex items-center gap-2">
		<li>
			<Button
				size="lg"
				variant="default"
				class="bg-amber-500 text-neutral-800 font-medium hover:bg-amber-600"
				aria-label="Sign Up">Sign Up</Button
			>
		</li>
		<li>
			<Button size="lg" variant="ghost" class=" font-medium" aria-label="Login">Login</Button>
		</li>
	</ul>
</nav>
