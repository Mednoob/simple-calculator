<script lang="ts">
    import { evalMath } from "$lib";

    let expression = $state("");
</script>

<div class="w-full h-screen flex items-center justify-center bg-gray-100">
    <div class="flex flex-col items-center">
        <p class="text-xl font-bold">Calculator</p>
        <p class="text-gray-600 text-sm">Just a simple calculator app. Built with Svelte :)</p>
        <div class="mt-4 flex flex-col">
            <input type="text" bind:value={expression} disabled class="border border-gray-300 rounded p-2 w-64" placeholder="Enter expression" />
            <div class="grid grid-cols-5">
                {#each [
                    "1", "2", "3", "+", "del",
                    "4", "5", "6", "-", "(",
                    "7", "8", "9", "*", ")",
                    ".", "0", "C", "/", "="] as str}
                    <button class="cursor-pointer border border-gray-300 rounded p-2 m-1 bg-blue-500 text-white" onclick={() => {
                        if (str === "=") {
                            try {
                                const result = evalMath(expression);
                                expression = result.toString();
                            } catch (error) {
                                alert((error as Error).message);
                            }
                        } else if (str === "C") {
                            expression = "";
                        } else if (str === "del") {
                            expression = expression.slice(0, -1);
                        } else {
                            expression += str;
                        }
                    }}>{str}</button>
                {/each}
            </div>
        </div>
    </div>
</div>
