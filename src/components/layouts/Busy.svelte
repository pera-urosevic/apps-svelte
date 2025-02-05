<script lang="ts">
  import { busy } from '@components/layouts/store'
</script>

{#if $busy}
  <div id="busy">
    <svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"></path>
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.4s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        ></animateTransform>
      </path>
    </svg>
  </div>
{/if}

<style>
  #busy {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: var(--color-mask);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      fill: var(--color-primary-light);
    }
  }
</style>
