---
type: Theme
order: 100
title: Default Layout
---

The default layout all parameters are prefixed with `@pokemon-default-`.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| `@pokemon-default-prefix` | `.pokemon-default` | Style name prefix |
| `@pokemon-default-ease` | `cubic-bezier(.25, 0, .15, 1)` | Animation filter function |
| `@pokemon-default-header-hg` | `64px` | Height of header |
| `@pokemon-default-header-bg` | `@primary-color` | Background-color of header |
| `@pokemon-default-header-padding` | `@layout-gutter * 2` | Horizontal padding of header |
| `@pokemon-default-header-search-enabled` | `true` | Whether top search |
| `@pokemon-default-header-search-height` | `34px` | Height of top search |
| `@pokemon-default-header-icon-fs` | `18px` | Font size of icon |
| `@pokemon-default-aside-wd` | `200px` | Width of aside |
| `@pokemon-default-aside-bg` | `#fff` | Background-color of aside |
| `@pokemon-default-aside-scrollbar-width` | `0` | Scrollbar width of aside |
| `@pokemon-default-aside-scrollbar-height` | `0` | Scrollbar height of aside |
| `@pokemon-default-aside-scrollbar-track-color` | `transparent` | Scrollbar track color of aside |
| `@pokemon-default-aside-scrollbar-thumb-color` | `transparent` | Scrollbar thumb color of aside |
| `@pokemon-default-aside-nav-fs` | `14px` | Font size of nav name |
| `@pokemon-default-aside-nav-icon-width`          | `14px`                         | Width of nav icon     |
| `@pokemon-default-aside-nav-img-wh`              | `14px`                         | Width & height of nav image |
| `@pokemon-default-aside-nav-padding-top-bottom` | `@layout-gutter` | Vertical padding of nav |
| `@pokemon-default-aside-nav-item-height` | `38px` | Item height of nav |
| `@pokemon-default-aside-nav-text-color` | `rgba(0, 0, 0, 0.65)` | Nav text color |
| `@pokemon-default-aside-nav-text-hover-color` | `#108ee9` | Nav text hover color |
| `@pokemon-default-aside-nav-group-text-color` | `rgba(0, 0, 0, 0.43)` | Group text color |
| `@pokemon-default-aside-nav-selected-text-color` | `#108ee9` | Nav selected text color |
| `@pokemon-default-aside-nav-selected-bg` | `#fcfcfc` | Nav selected background color |
| `@pokemon-default-aside-collapsed-wd` | `@layout-gutter * 8` |  Width of aside collapsed |
| `@pokemon-default-aside-collapsed-nav-fs` | `24px` | Font size of aside collapsed |
| `@pokemon-default-aside-collapsed-nav-img-wh` | `24px` | Width & height nav image of aside collapsed |
| `@pokemon-default-content-heading-bg` | `#fafbfc` |  Heading background color of content area |
| `@pokemon-default-content-heading-border` | `#efe3e5` | Heading bottom border color of content area |
| `@pokemon-default-content-padding` | `@layout-gutter * 3` | Padding of content area |
| `@pokemon-default-content-bg` | `#f5f7fa` | Background color of content area |
| `@pokemon-default-widget-app-icons-enabled` | `true` | Whether the app-icon widget styles |
| `@pokemon-default-aside-user-enabled`       | `true` | Whether the user styles of aside |

## Usage

Import in `src/styles.less`:

```less
@import '~@pokemon/theme/styles/layout/default/index';
```
