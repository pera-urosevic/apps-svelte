<script lang="ts">
  type Props = {
    height?: number
    width?: number
    min?: number
    max?: number
    minColor?: [number, number, number]
    maxColor?: [number, number, number]
    unit?: string
    label?: string
    value: number
  }
  let {
    height = 140,
    width = 140,
    min = 0,
    max = 100,
    minColor = [0, 255, 0],
    maxColor = [255, 0, 0],
    unit = '%',
    label = '',
    value,
  }: Props = $props()

  const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
    let channelA = colorChannelA * amountToMix
    let channelB = colorChannelB * (1 - amountToMix)
    return String(channelA + channelB)
  }

  const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
    let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix)
    let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix)
    let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix)
    return `rgb(${r},${g},${b})`
  }

  let ratio = $derived((value - min) / (max - min))
  let percentage = $derived(ratio * 100)
  let color = $derived(colorMixer(maxColor, minColor, ratio))
</script>

<div class="gauge" style={`width: ${width}px; height: ${height}px`}>
  <svg viewBox="0 0 36 36" {width} {height}>
    <path
      d="M18 2.0 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      fill="none"
      stroke="#444"
      stroke-width="3"
      stroke-dasharray="100, 100"
    />
    <path
      d="M18 2.0 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      fill="none"
      stroke={color}
      stroke-width="3"
      stroke-dasharray={`${percentage}, 100`}
    />
  </svg>
  <div class="text">
    <div class="label" title={label}>{label}</div>
    <div class="value">{`${value}${unit}`}</div>
  </div>
</div>

<style>
  .gauge {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      position: absolute;
      top: 0;
    }
    .text {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .label {
        font-size: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
      }
      .value {
        font-size: 18px;
      }
    }
  }
</style>
