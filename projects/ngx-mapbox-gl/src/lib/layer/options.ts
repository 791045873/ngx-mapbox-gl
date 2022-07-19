/**
 * 以下配置仅为样式配置，还需指定id，resource，resource-layer等等内容
 * defaultRiverOption: 默认的河流配置
 * riverChannelOption: 深泓线配置
 * riverAreaOption: 流域面配置
 * riverBankOption: 河岸线
 * highlightLineOption: 河流选中高亮
 * lineNameOption: 河流名
 * managementLineOption: 管理线
 * protectLineOption: 保护线
 */

import { FillPaint, LineLayout, LinePaint, SymbolLayout, SymbolPaint } from "mapbox-gl"

interface IQqslLayerOptions {
  defaultRiverOption: {
    type: 'line',
    layout: LineLayout,
    paint: LinePaint
  },
  riverChannelOption: {
    type: 'line',
    paint: LinePaint
  },
  riverAreaOption: {
    type: 'fill',
    paint: FillPaint
  },
  riverBankOption: {
    type: 'line',
    paint: LinePaint
  },
  highlightLineOption: {
    type: 'line',
    paint: LinePaint
  },
  lineNameOption: {
    type: 'symbol',
    layout: SymbolLayout,
    paint: SymbolPaint
  },
  managementLineOption: {
    type: 'line',
    layout: LineLayout,
    paint: LinePaint
  },
  protectLineOption: {
    type: 'line',
    layout: LineLayout,
    paint: LinePaint
  }
}
export const qqslLayerOptions: IQqslLayerOptions = {
  defaultRiverOption: {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
      'line-sort-key': 1,
    },
    paint: {
      'line-color': 'hsl(200, 80%, 50%)',
      'line-width': 3,
    },
  },
  riverChannelOption: {
    type: 'line',
    paint: { 'line-color': '#3479ce', 'line-width': 2, 'line-opacity': 1 },
  },
  riverAreaOption: {
    type: 'fill',
    paint: { 'fill-color': 'rgba(60,91,252,0.15)', 'fill-outline-color': '#3c5bfc' },
  },
  riverBankOption: {
    type: 'line',
    paint: { 'line-color': '#005ce6', 'line-width': 2, 'line-opacity': 0.65 },
  },
  highlightLineOption: {
    type: 'line',
    paint: {
      'line-color': '#f437d1',
      'line-width': 2,
      'line-opacity': 0.65,
    },
  },
  lineNameOption: {
    type: 'symbol',
    layout: {
      'symbol-placement': 'line',
      'text-field': '{name}',
      'text-letter-spacing': 0.1,
      'text-size': 12,
      'text-justify': 'auto',
      'text-anchor': 'bottom',
      'text-keep-upright': true,
    },
    paint: {
      'text-color': '#222222',
    },
  },
  managementLineOption: {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#ff0000',
      'line-width': 2,
    },
  },
  protectLineOption: {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#e4007f',
      'line-width': 2,
    },
  }
}