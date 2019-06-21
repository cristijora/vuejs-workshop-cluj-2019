<template>
    <div class="flex flex-col items-center">
        <img src="/img/no-data.svg" alt="No data" class="h-48">
        <br>
        <span class="text-bold text-lg text-gray-800">
            <slot></slot>
        </span>
    </div>
</template>
<script>
  export default {
    name: 'no-data'
  }
</script>
