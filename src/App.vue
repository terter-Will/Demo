<template>
  <div id="app">
    <router-link to="/" class="router-link">Home</router-link>
    <router-link to="/todolist" class="router-link">Todo List</router-link>
    <router-link to="/selector" class="router-link">Selector</router-link>
    <router-link to="/codereview1" class="router-link">Code Review 1</router-link>
    <router-link to="/codereview2" class="router-link">Code Review 2</router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.router-link {
  display: inline-block;
  margin-right: 10px;
  border-right: 1px solid #ccc;
  padding-right: 10px;
}

.router-link:last-child {
  border-right: none;
  margin-right: 0;
}
</style>






