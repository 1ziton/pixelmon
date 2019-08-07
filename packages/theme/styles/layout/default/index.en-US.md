---
type: Theme
order: 100
title: Default Layout
---

The default layout all parameters are prefixed with `@pixelmon-default-`.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| `@pixelmon-default-prefix` | `.pixelmon-default` | Style name prefix |
| `@pixelmon-default-ease` | `cubic-bezier(.25, 0, .15, 1)` | Animation filter function |
| `@pixelmon-default-header-hg` | `64px` | Height of header |
| `@pixelmon-default-header-bg` | `@primary-color` | Background-color of header |
| `@pixelmon-default-header-padding` | `@layout-gutter * 2` | Horizontal padding of header |
| `@pixelmon-default-header-search-enabled` | `true` | Whether top search |
| `@pixelmon-default-header-search-height` | `34px` | Height of top search |
| `@pixelmon-default-header-icon-fs` | `18px` | Font size of icon |
| `@pixelmon-default-aside-wd` | `200px` | Width of aside |
| `@pixelmon-default-aside-bg` | `#fff` | Background-color of aside |
| `@pixelmon-default-aside-scrollbar-width` | `0` | Scrollbar width of aside |
| `@pixelmon-default-aside-scrollbar-height` | `0` | Scrollbar height of aside |
| `@pixelmon-default-aside-scrollbar-track-color` | `transparent` | Scrollbar track color of aside |
| `@pixelmon-default-aside-scrollbar-thumb-color` | `transparent` | Scrollbar thumb color of aside |
| `@pixelmon-default-aside-nav-fs` | `14px` | Font size of nav name |
| `@pixelmon-default-aside-nav-icon-width`          | `14px`                         | Width of nav icon     |
| `@pixelmon-default-aside-nav-img-wh`              | `14px`                         | Width & height of nav image |
| `@pixelmon-default-aside-nav-padding-top-bottom` | `@layout-gutter` | Vertical padding of nav |
| `@pixelmon-default-aside-nav-item-height` | `38px` | Item height of nav |
| `@pixelmon-default-aside-nav-text-color` | `rgba(0, 0, 0, 0.65)` | Nav text color |
| `@pixelmon-default-aside-nav-text-hover-color` | `#108ee9` | Nav text hover color |
| `@pixelmon-default-aside-nav-group-text-color` | `rgba(0, 0, 0, 0.43)` | Group text color |
| `@pixelmon-default-aside-nav-selected-text-color` | `#108ee9` | Nav selected text color |
| `@pixelmon-default-aside-nav-selected-bg` | `#fcfcfc` | Nav selected background color |
| `@pixelmon-default-aside-collapsed-wd` | `@layout-gutter * 8` |  Width of aside collapsed |
| `@pixelmon-default-aside-collapsed-nav-fs` | `24px` | Font size of aside collapsed |
| `@pixelmon-default-aside-collapsed-nav-img-wh` | `24px` | Width & height nav image of aside collapsed |
| `@pixelmon-default-content-heading-bg` | `#fafbfc` |  Heading background color of content area |
| `@pixelmon-default-content-heading-border` | `#efe3e5` | Heading bottom border color of content area |
| `@pixelmon-default-content-padding` | `@layout-gutter * 3` | Padding of content area |
| `@pixelmon-default-content-bg` | `#f5f7fa` | Background color of content area |
| `@pixelmon-default-widget-app-icons-enabled` | `true` | Whether the app-icon widget styles |
| `@pixelmon-default-aside-user-enabled`       | `true` | Whether the user styles of aside |

## Usage

Import in `src/styles.less`:

```less
@import '~@pixelmon/theme/styles/layout/default/index';
```
