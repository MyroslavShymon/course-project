<template>
  <div>
    <router-link to="/" class="d-flex align-center text-decoration-none">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 0C6.0558 0 0 6.0558 0 13.5C0 20.9442 6.0558 27 13.5 27C20.9442 27 27 20.9442 27 13.5C27 6.0558 20.9442 0 13.5 0Z"
          :fill="
            $vuetify.theme.dark
              ? $vuetify.theme.themes.dark.primary
              : $vuetify.theme.themes.light.primary
          "
        />
        <path
          d="M20.3683 10.6528L13.0464 17.9745C12.8267 18.1941 12.5384 18.3047 12.25 18.3047C11.9617 18.3047 11.6733 18.1941 11.4536 17.9745L7.7928 14.3136C7.35223 13.8732 7.35223 13.1612 7.7928 12.7209C8.23315 12.2803 8.94495 12.2803 9.38551 12.7209L12.25 15.5854L18.7756 9.06004C19.2159 8.61947 19.9277 8.61947 20.3683 9.06004C20.8086 9.5004 20.8086 10.2122 20.3683 10.6528Z"
          fill="#FAFAFA"
        />
      </svg>
      <span class="organizer mx-1 primary--text d-flex"
        >Organizer++</span
      ></router-link
    >
  </div>
</template>
