<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="text-start">Create something</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="d-flex justify-space-between">
            Create task <span class="combination">Alt+Shift+Y</span>
          </td>
        </tr>
        <tr>
          <td class="d-flex justify-space-between">
            Create reninder <span class="combination">Alt+Shift+U</span>
          </td>
        </tr>
        <tr>
          <td class="d-flex justify-space-between">
            Create documents <span class="combination">Alt+Shift+I</span>
          </td>
        </tr>
        <tr>
          <td class="d-flex justify-space-between">
            Create plans <span class="combination">Alt+Shift+O</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.combination {
  padding: 2px 6px;
  border: 1px solid $accent;
  border-radius: 7px;
}
</style>
