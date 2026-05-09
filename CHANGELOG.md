# Changelog

## [3.2.1](https://github.com/dm4t2/vue-currency-input/compare/vue-currency-input-3.2.2...vue-currency-input-3.2.1) (2026-05-09)


### ⚠ BREAKING CHANGES

* 
* 
* 
* 
* 
* `distractionFree` option was replaced by single options `hideCurrencySymbolOnFocus`, `hideGroupingSeparatorOnFocus` and `hideNegligibleDecimalDigitsOnFocus`
* 
* 
* 
* 
* option hideThousandsSeparatorSymbol has been renamed to hideGroupingSymbol
* option hideNegligibleFractionDigits has been renamed to hideNegligibleDecimalDigits

### Features

* add $parseCurrency method to get number value from currency formatted string ([e1c51b1](https://github.com/dm4t2/vue-currency-input/commit/e1c51b15a80baacfa05a0ee48fc22444dc926b0f)), closes [#9](https://github.com/dm4t2/vue-currency-input/issues/9)
* add directive and provide installation as Vue plugin ([f6a5853](https://github.com/dm4t2/vue-currency-input/commit/f6a58533b81deed1aa4052d3b4f1f39fbbc4e8e5)), closes [#1](https://github.com/dm4t2/vue-currency-input/issues/1)
* add IE11 support ([ebfcab5](https://github.com/dm4t2/vue-currency-input/commit/ebfcab5860f00fcdf3a98b6fef78a61e27b6d4fa))
* add more detailed configuration for distraction free mode ([454fab9](https://github.com/dm4t2/vue-currency-input/commit/454fab99ee9a05533de59dae3466b501add3c731))
* add new option `accountingSign` ([#306](https://github.com/dm4t2/vue-currency-input/issues/306)) ([d392089](https://github.com/dm4t2/vue-currency-input/commit/d392089167aeefe9863d355ebdd67044cc926e27))
* add new option `autoEmit` ([#330](https://github.com/dm4t2/vue-currency-input/issues/330)) ([c881bdd](https://github.com/dm4t2/vue-currency-input/commit/c881bdd41999886aa21a0a6091e902f614d51543))
* add new option `autoSign` ([#193](https://github.com/dm4t2/vue-currency-input/issues/193)) ([df5844d](https://github.com/dm4t2/vue-currency-input/commit/df5844d79db3f9cac24a275746c7405b283afc82))
* add new option `currencyDisplay` ([#209](https://github.com/dm4t2/vue-currency-input/issues/209)) ([b74e54f](https://github.com/dm4t2/vue-currency-input/commit/b74e54f11ce46414426aa53ca38cd89bf90eb49d))
* add new option `useGrouping` ([#170](https://github.com/dm4t2/vue-currency-input/issues/170)) ([d2cd76d](https://github.com/dm4t2/vue-currency-input/commit/d2cd76d26e8ae4386f8e8b92dc3bfc08548cfa86))
* add new option `valueScaling` ([#305](https://github.com/dm4t2/vue-currency-input/issues/305)) ([94c2485](https://github.com/dm4t2/vue-currency-input/commit/94c2485f39acde9af63532a7678e281f35b03733))
* add number range ([7d11f55](https://github.com/dm4t2/vue-currency-input/commit/7d11f55e6dbbdc9dc15ba7c6452f80fdb488b860)), closes [#2](https://github.com/dm4t2/vue-currency-input/issues/2)
* add Nuxt module ([7dc0e33](https://github.com/dm4t2/vue-currency-input/commit/7dc0e336d28217de060016483b838827b05e8e22))
* add option for precision ranges ([#41](https://github.com/dm4t2/vue-currency-input/issues/41)) ([e480e41](https://github.com/dm4t2/vue-currency-input/commit/e480e416d81707ca1370483b613dfe5fa6738098))
* add option to disable negative values ([#67](https://github.com/dm4t2/vue-currency-input/issues/67)) ([cdf3b96](https://github.com/dm4t2/vue-currency-input/commit/cdf3b96cb2c9e7f8575fb3ebe4708254209fe536))
* add support for arabic numbers ([#100](https://github.com/dm4t2/vue-currency-input/issues/100)) ([f3e14b3](https://github.com/dm4t2/vue-currency-input/commit/f3e14b328ca22614806e7003cc045c47e6ff227c))
* add support for custom decimal length ([8d6b372](https://github.com/dm4t2/vue-currency-input/commit/8d6b372a2d9d734a9ba840a4eee34e66db631451)), closes [#16](https://github.com/dm4t2/vue-currency-input/issues/16)
* add support for lazy value binding ([#78](https://github.com/dm4t2/vue-currency-input/issues/78)) ([ad1565d](https://github.com/dm4t2/vue-currency-input/commit/ad1565da1962d36dd1c71a32bf20084c9ec3fd40))
* add support for precision range ([#261](https://github.com/dm4t2/vue-currency-input/issues/261)), closes [#294](https://github.com/dm4t2/vue-currency-input/issues/294) ([b8062ee](https://github.com/dm4t2/vue-currency-input/commit/b8062ee6f1ed3f7813a9677e46a2cd5fe6e2216c))
* add support for Vue 2.7, closes [#335](https://github.com/dm4t2/vue-currency-input/issues/335) ([aaf95e6](https://github.com/dm4t2/vue-currency-input/commit/aaf95e6aeedd558fdd601e108471b8f43e42b18a))
* add support for Vue 3 ([627305e](https://github.com/dm4t2/vue-currency-input/commit/627305e9a998d4545231c5a96d24a17689acbf04))
* add TypeScript support ([#44](https://github.com/dm4t2/vue-currency-input/issues/44)) ([2801e5b](https://github.com/dm4t2/vue-currency-input/commit/2801e5b4a78ebc8b74c24090d42d1fc83cdf4c26))
* allow custom currency symbols (even an empty one) ([f5ca3f4](https://github.com/dm4t2/vue-currency-input/commit/f5ca3f4028c18ae76f71406ee73621466a1a3076)), closes [#25](https://github.com/dm4t2/vue-currency-input/issues/25)
* allow input of decimal separators different from the current locale ([#71](https://github.com/dm4t2/vue-currency-input/issues/71), [#126](https://github.com/dm4t2/vue-currency-input/issues/126)) ([18bcf53](https://github.com/dm4t2/vue-currency-input/commit/18bcf537dd41f334e0dde08a8a423a46dbe00dac))
* allow negative values ([e978017](https://github.com/dm4t2/vue-currency-input/commit/e9780178a279e8bf19273d4767f7fa061a57554a))
* Allow value scaling by 10,000 ([443321d](https://github.com/dm4t2/vue-currency-input/commit/443321d50bc8e73ed41fa3c553614012fb951745))
* apply number range validation optionally on input ([bad3267](https://github.com/dm4t2/vue-currency-input/commit/bad32671a87e70ba551a169e9facbc97f35c5fe3))
* consider min value also for empty values ([#49](https://github.com/dm4t2/vue-currency-input/issues/49)) ([ee872d0](https://github.com/dm4t2/vue-currency-input/commit/ee872d014288533a8ef5c7ffba27cd7cccd9be48))
* enable numeric keyboard on mobile devices ([#88](https://github.com/dm4t2/vue-currency-input/issues/88)) ([227e93c](https://github.com/dm4t2/vue-currency-input/commit/227e93c7ccb7596110df457a1b85b72492948361))
* improve browser compatibility ([#15](https://github.com/dm4t2/vue-currency-input/issues/15), [#109](https://github.com/dm4t2/vue-currency-input/issues/109), [#112](https://github.com/dm4t2/vue-currency-input/issues/112)) ([a87d477](https://github.com/dm4t2/vue-currency-input/commit/a87d47763cb6a139b0afe07a7f76b6089fc6b097))
* improve error handling ([859d9ac](https://github.com/dm4t2/vue-currency-input/commit/859d9acc325a4d2b171b07efe5f83ae80737678b))
* improve event handling ([41042c1](https://github.com/dm4t2/vue-currency-input/commit/41042c17c816db1733b7b2cacc6b4e8ed666f172))
* introduce API method to set value programmatically ([#64](https://github.com/dm4t2/vue-currency-input/issues/64)) ([1c269e4](https://github.com/dm4t2/vue-currency-input/commit/1c269e46a6a8749a7abaeeaa4df890c945f3f96c))
* introduce auto decimal mode ([d592ba1](https://github.com/dm4t2/vue-currency-input/commit/d592ba127160407f347b3c5cbc1e34e389aec9b2))
* introduce global options to allow override of default options ([cadf6f3](https://github.com/dm4t2/vue-currency-input/commit/cadf6f346655fad71a156372c0b7373c65fe08a7))
* introduce method to set component value programmatically ([#58](https://github.com/dm4t2/vue-currency-input/issues/58)) ([947c634](https://github.com/dm4t2/vue-currency-input/commit/947c634cac0d1028788b5e4b299e92ae249ac237))
* introduce new API function `parse` for parsing currency formatted values ([#273](https://github.com/dm4t2/vue-currency-input/issues/273)) ([86cbd2b](https://github.com/dm4t2/vue-currency-input/commit/86cbd2b5bf1df74db90dd0873bb0b3b37c2c25ce))
* introduce new option `decimalDigitsReplacement` and hide decimal digits for integer numbers by default ([#203](https://github.com/dm4t2/vue-currency-input/issues/203)) ([09cb1cc](https://github.com/dm4t2/vue-currency-input/commit/09cb1cc69bd733a0e35a54cdde9137c74a54596e))
* introduce new prop `value-range` ([6e720d7](https://github.com/dm4t2/vue-currency-input/commit/6e720d7804d322e8c311ca37b8b316469639940d))
* introduce parseCurrency API method ([140a19f](https://github.com/dm4t2/vue-currency-input/commit/140a19f8722125a559fcfcf38273667290bec836)), closes [#27](https://github.com/dm4t2/vue-currency-input/issues/27)
* precision range ([b05e011](https://github.com/dm4t2/vue-currency-input/commit/b05e0113c174b132a0da857d060c099e97319bec))
* recover API method for parsing currency formatted strings ([#149](https://github.com/dm4t2/vue-currency-input/issues/149)) ([f29ca6f](https://github.com/dm4t2/vue-currency-input/commit/f29ca6fa2a12bb8d4b3f9520e11c2c34f325db6d))
* remove `parse` method ([e20bae9](https://github.com/dm4t2/vue-currency-input/commit/e20bae921a9e6218d908cbc54e86f8cf10023aff))
* remove default export ([4555928](https://github.com/dm4t2/vue-currency-input/commit/45559288eb312c0172e3005cd8aa2767a2bc9f18))
* remove option `autoSign` ([dddd42d](https://github.com/dm4t2/vue-currency-input/commit/dddd42da81514ca262a563893eea5e12b8f06bf1))
* remove option `exportValueAsInteger` ([09d3392](https://github.com/dm4t2/vue-currency-input/commit/09d3392ac182be4e75b44bf2207be45c047fe6f4))
* remove validateOnInput option ([d1a8359](https://github.com/dm4t2/vue-currency-input/commit/d1a8359e2381b683478e82ea73a1a19b6f39f727))
* rename option `valueAsInteger` to `exportValueAsInteger` ([9ee3ecc](https://github.com/dm4t2/vue-currency-input/commit/9ee3ecca2ab8ebcdc4ea0599a29f15d1a125d7dd))
* simplify API for getting number values ([ee82940](https://github.com/dm4t2/vue-currency-input/commit/ee82940e26293403ff360694d408097143a9ec5e))
* simplify usage of API methods ([10ec43f](https://github.com/dm4t2/vue-currency-input/commit/10ec43ff3d7ae89f537e073d2128ee516e9c4ee8))
* Support Chinese dot as decimal separator ([b4ecd1a](https://github.com/dm4t2/vue-currency-input/commit/b4ecd1a1bbd7440036157f4271e831266d656e5b))
* use directive for component ([ce20fab](https://github.com/dm4t2/vue-currency-input/commit/ce20fab923f6cc9173938d9edc3b9e5f7ce7c517))
* value as integer ([#39](https://github.com/dm4t2/vue-currency-input/issues/39)) ([73fa37f](https://github.com/dm4t2/vue-currency-input/commit/73fa37f83d97370ed8b60d384a285e5126f4b7ea))
* value as integer ([#39](https://github.com/dm4t2/vue-currency-input/issues/39)) ([6e87897](https://github.com/dm4t2/vue-currency-input/commit/6e87897e238743db7191713f68272d418bac27a8))


### Bug Fixes

* `options` argument of `$parseCurrency` method should be optional ([#93](https://github.com/dm4t2/vue-currency-input/issues/93)) ([2105205](https://github.com/dm4t2/vue-currency-input/commit/2105205e10a22f13c63aade72178708b4054d383))
* `parseCurrency` returns wrong value when grouping symbol is a decimal point ([#102](https://github.com/dm4t2/vue-currency-input/issues/102)) ([2793dc5](https://github.com/dm4t2/vue-currency-input/commit/2793dc51bc9d16c18a94388c51bb227c966a1cd3))
* add caret trap before decimal symbol ([dd538cd](https://github.com/dm4t2/vue-currency-input/commit/dd538cd812e3214cc536a6869fb89d6447f142a1))
* add missing export for `parse` method ([781b36a](https://github.com/dm4t2/vue-currency-input/commit/781b36a18143442ca505b9c3049dd8d20b8d8af2))
* add missing exports for UMD bundle ([453c0bd](https://github.com/dm4t2/vue-currency-input/commit/453c0bdd16e4a5015139471b4444a1e733eae010)), closes [#38](https://github.com/dm4t2/vue-currency-input/issues/38)
* add null checks ([#283](https://github.com/dm4t2/vue-currency-input/issues/283)) ([1d5599e](https://github.com/dm4t2/vue-currency-input/commit/1d5599e0a3442d7a183c050ea31bcc05bd83f2e9))
* allow decimal symbol in custom currency prefix/suffix ([f633d0d](https://github.com/dm4t2/vue-currency-input/commit/f633d0de79492a4d10e967cec5f2119ed14e6e68))
* allow input be cleared externally ([#63](https://github.com/dm4t2/vue-currency-input/issues/63)) ([3a6c210](https://github.com/dm4t2/vue-currency-input/commit/3a6c210652ab7c336f69bb0c473a113eef71022d))
* allow input of decimal zeros when distraction free mode is enabled ([0748a2f](https://github.com/dm4t2/vue-currency-input/commit/0748a2f60f1043048bf8f66f1e12e494a4321392)), closes [#22](https://github.com/dm4t2/vue-currency-input/issues/22)
* allow negative values if only a max value is set ([8c1c93d](https://github.com/dm4t2/vue-currency-input/commit/8c1c93d51718f5fd3ca96fbd7db5b5835597430b))
* allow to clear the input completely with backspace when `autoDecimalDigits` is enabled ([#202](https://github.com/dm4t2/vue-currency-input/issues/202)) ([82b32e6](https://github.com/dm4t2/vue-currency-input/commit/82b32e6e37dbda280c4530fb60ffa9af95a146fe))
* **autoDecimalDigits:** Ignore input of decimal symbol ([#389](https://github.com/dm4t2/vue-currency-input/issues/389)) ([4cee284](https://github.com/dm4t2/vue-currency-input/commit/4cee28446dd0d9d9d5d0dfbe190cd49254b74017))
* **autoDecimalDigits:** use the maximumFractionDigits of the currency format ([9abcbc9](https://github.com/dm4t2/vue-currency-input/commit/9abcbc93c1b10e557561c75e7193335270ef9d73))
* **autoSign:** avoid display of negative zero ([5e03237](https://github.com/dm4t2/vue-currency-input/commit/5e032372f79dbc26a74cc163b5d8384a94623da7))
* **build:** fix ESM export ([04b512c](https://github.com/dm4t2/vue-currency-input/commit/04b512c23c525704297125c99a1aa94cb553a8b1))
* capture input events ([#157](https://github.com/dm4t2/vue-currency-input/issues/157), [#158](https://github.com/dm4t2/vue-currency-input/issues/158)) ([3f773fb](https://github.com/dm4t2/vue-currency-input/commit/3f773fb3c21ef17a90dcec3bcc56b4c902c27a16))
* change default value of option `useGrouping` ([#296](https://github.com/dm4t2/vue-currency-input/issues/296)) ([a37963e](https://github.com/dm4t2/vue-currency-input/commit/a37963ec4dcf42b528bf2e4aec628745f4513bb7))
* **ci:** build before releasing npm package ([1ae932c](https://github.com/dm4t2/vue-currency-input/commit/1ae932cb92b80c387d334d47473119467199425a))
* clear input on blur if number value is null ([5e03c05](https://github.com/dm4t2/vue-currency-input/commit/5e03c056c3759285e40e7529f20503e5dc98dd37))
* **component:** change event is not triggered ([#91](https://github.com/dm4t2/vue-currency-input/issues/91)) ([22d992d](https://github.com/dm4t2/vue-currency-input/commit/22d992d883901744fe33e737372b178a3a9a515e))
* **component:** fix detection of external value changes ([7a2325e](https://github.com/dm4t2/vue-currency-input/commit/7a2325ec3235c3d485cdabc075e26428e2acf272))
* consider precision for determining max allowed input value ([#188](https://github.com/dm4t2/vue-currency-input/issues/188)) ([0c1c412](https://github.com/dm4t2/vue-currency-input/commit/0c1c4128683ebf4eaa88deb8919d57ce645fe538))
* correct type of valueRange property ([50ef9ad](https://github.com/dm4t2/vue-currency-input/commit/50ef9ad85f8c20e7a1d878b046d59438e14bb0a9))
* currency names containing a hyphen break number parsing ([0374965](https://github.com/dm4t2/vue-currency-input/commit/037496589b559ad1cbdbe4d3398240188a2d4931))
* directive does not apply global options ([9d68c4a](https://github.com/dm4t2/vue-currency-input/commit/9d68c4aaa80cda66d7ee4efc887bf1ad3138decf))
* **directive:** respect global options on bind if a value is present ([#133](https://github.com/dm4t2/vue-currency-input/issues/133)) ([388edb6](https://github.com/dm4t2/vue-currency-input/commit/388edb61c8d783e00ee16f72e02ab5e9ac9d9747))
* **directive:** value binding was broken ([#60](https://github.com/dm4t2/vue-currency-input/issues/60)) ([61c5900](https://github.com/dm4t2/vue-currency-input/commit/61c5900c6635f2f75d1dfbaf8cc141acc4ca54d3))
* **distractionFree:** allow input of decimal zeros ([#69](https://github.com/dm4t2/vue-currency-input/issues/69)) ([ce825ff](https://github.com/dm4t2/vue-currency-input/commit/ce825ffd18543a63ae6df429946b018cb4d38ee5))
* erroneous Nuxt module ([697f96a](https://github.com/dm4t2/vue-currency-input/commit/697f96a284cc7b6a88a27e26b44970c44279a80f))
* event listener detection broken for Vue 3 ([3af613c](https://github.com/dm4t2/vue-currency-input/commit/3af613cc898fbd6b7bc3b944a91661472c4a0b43))
* fix cursor jumps with input component of Quasar/Element Plus ([59b8b40](https://github.com/dm4t2/vue-currency-input/commit/59b8b405211c0fa0f337b118ab8d46001f030da6))
* float numbers are incorrectly handled for some locales ([23c6b17](https://github.com/dm4t2/vue-currency-input/commit/23c6b170be0870e9c51e0b23f277c6bba21d22bb)), closes [#6](https://github.com/dm4t2/vue-currency-input/issues/6)
* float values are incorrectly handled on input ([f1de4c7](https://github.com/dm4t2/vue-currency-input/commit/f1de4c78afe6aecf4105b7bce921763becd1b6a1)), closes [#23](https://github.com/dm4t2/vue-currency-input/issues/23)
* format "0" accordingly on blur ([#145](https://github.com/dm4t2/vue-currency-input/issues/145)) ([f57f7fe](https://github.com/dm4t2/vue-currency-input/commit/f57f7fe63436505bccc817e3a55fd0bd0ffbba30))
* grouping symbol was incorrectly determined for locale "es" ([36a2a77](https://github.com/dm4t2/vue-currency-input/commit/36a2a77d048f2cd1dda6f3884d493ea6cfa7576e)), closes [#24](https://github.com/dm4t2/vue-currency-input/issues/24)
* grouping symbol was incorrectly treated as decimal symbol ([0746018](https://github.com/dm4t2/vue-currency-input/commit/0746018adc424ccb841a04c8b3f99027a18de6bd)), closes [#40](https://github.com/dm4t2/vue-currency-input/issues/40)
* handle multiple event listeners properly ([#156](https://github.com/dm4t2/vue-currency-input/issues/156)) ([77db2b2](https://github.com/dm4t2/vue-currency-input/commit/77db2b2a06f73e3369c14efafeba4ce41fd65066))
* handle null values when options change ([1a80e23](https://github.com/dm4t2/vue-currency-input/commit/1a80e23a803ffffdeaed70470124e34ed5d74eab))
* handle untrusted input/change events to improve testability ([#257](https://github.com/dm4t2/vue-currency-input/issues/257)) ([27a64be](https://github.com/dm4t2/vue-currency-input/commit/27a64be504cf783e6f8c35a606a42a65d85c46e9))
* hide currency symbol for incomplete values when distraction free mode is enabled ([503802f](https://github.com/dm4t2/vue-currency-input/commit/503802f43c9e82c53c463a53910e098be6b120fd)), closes [#32](https://github.com/dm4t2/vue-currency-input/issues/32)
* ignore prefix/suffix in caret position calculation when `currencyDisplay` is `hidden` ([#274](https://github.com/dm4t2/vue-currency-input/issues/274)) ([ffb384b](https://github.com/dm4t2/vue-currency-input/commit/ffb384bebba4053727c861e7e645c3db6642f2c6))
* improve detection of decimal/grouping separator ([#296](https://github.com/dm4t2/vue-currency-input/issues/296)) ([61a4201](https://github.com/dm4t2/vue-currency-input/commit/61a4201c834fb246594f86937531d3030ab070db))
* improve event handling ([#89](https://github.com/dm4t2/vue-currency-input/issues/89)) ([0896c73](https://github.com/dm4t2/vue-currency-input/commit/0896c73d0c60430e2ea89fba507cdc035c17a939))
* improve number parsing on input/blur ([408bd40](https://github.com/dm4t2/vue-currency-input/commit/408bd40b0029169be361db940f99f8bad7aa09d7)), closes [#40](https://github.com/dm4t2/vue-currency-input/issues/40)
* initial formatting does not respect `locale` of global options ([#110](https://github.com/dm4t2/vue-currency-input/issues/110)) ([86ca3f1](https://github.com/dm4t2/vue-currency-input/commit/86ca3f1f5bb31cfdb61ebcde3a139be2cd114fae))
* initial value formatting ([14465b0](https://github.com/dm4t2/vue-currency-input/commit/14465b0fa6f2d2984c91354735895d0b5c8cbd0c)), closes [#12](https://github.com/dm4t2/vue-currency-input/issues/12)
* input can not be cleared when using `valueAsInteger` ([#86](https://github.com/dm4t2/vue-currency-input/issues/86)) ([9b974cb](https://github.com/dm4t2/vue-currency-input/commit/9b974cbd125ee57fcb945f0a4b54ae73a8447d89))
* input of decimal separators was broken for Android devices ([#190](https://github.com/dm4t2/vue-currency-input/issues/190)) ([d9c0133](https://github.com/dm4t2/vue-currency-input/commit/d9c013304ead027222090ac165ac9b0929f27161))
* input of decimal zeros not possible when using precision range ([#87](https://github.com/dm4t2/vue-currency-input/issues/87)) ([3fca0a7](https://github.com/dm4t2/vue-currency-input/commit/3fca0a7d3bcefa9f774c0bcab73117d0cca8ad93))
* input of negative values not possible ([7c3f4f5](https://github.com/dm4t2/vue-currency-input/commit/7c3f4f530d4c7254c3a5fe2f249f7f6ed0569d0c)), closes [#36](https://github.com/dm4t2/vue-currency-input/issues/36)
* input of negative values was broken for RTL locales ([883f69d](https://github.com/dm4t2/vue-currency-input/commit/883f69dffc5c2fd36d2df791496a48e4ffad658c))
* inputRef can not be rendered conditionally ([#304](https://github.com/dm4t2/vue-currency-input/issues/304)) ([5cbc8a1](https://github.com/dm4t2/vue-currency-input/commit/5cbc8a19b23306d60e6cd627f34d98007702817f))
* manually entered decimal digits causes broken formatting with distraction free mode enabled ([ec7d785](https://github.com/dm4t2/vue-currency-input/commit/ec7d785a9fc2c6f35f99ad961208bf6b2b53cef8)), closes [#8](https://github.com/dm4t2/vue-currency-input/issues/8)
* merge $parseCurrency options argument with plugin global options ([3f97d07](https://github.com/dm4t2/vue-currency-input/commit/3f97d073b33c82b655a747a61600234a4a55db6a))
* negative value handling ([#66](https://github.com/dm4t2/vue-currency-input/issues/66)) ([0052dfd](https://github.com/dm4t2/vue-currency-input/commit/0052dfddb2b3d405174e802707899f20ea4f8298))
* negative values are not working when locale is set to nl-NL ([e6ff8a1](https://github.com/dm4t2/vue-currency-input/commit/e6ff8a1c80e4ae203fcae54bc69d07b9986f4fde)), closes [#30](https://github.com/dm4t2/vue-currency-input/issues/30)
* negative values broken for locale `de-CH` ([444dab4](https://github.com/dm4t2/vue-currency-input/commit/444dab40516c6acbb37071d95d977976ae6781ef))
* negative values broken for some locales when distraction free mode is enabled ([#123](https://github.com/dm4t2/vue-currency-input/issues/123)) ([d455c15](https://github.com/dm4t2/vue-currency-input/commit/d455c15fc3ddf75f9a492c2b11065baf32b6bb89))
* negative values broken when prefix/negativePrefix have different whitespaces ([d25c7c1](https://github.com/dm4t2/vue-currency-input/commit/d25c7c102ff612fdb2b6b85c206fd136f7b5250f))
* npm 7 compatibility ([1052268](https://github.com/dm4t2/vue-currency-input/commit/1052268f3ad13a0cfc812508d33d20f4c8be53c7))
* number parsing was broken for locale de-AT ([#192](https://github.com/dm4t2/vue-currency-input/issues/192)) ([32b2e14](https://github.com/dm4t2/vue-currency-input/commit/32b2e145b408c1afd6ea0d479c76ab0f89290c70))
* number parsing was broken for locale de-AT ([#192](https://github.com/dm4t2/vue-currency-input/issues/192)) ([383f469](https://github.com/dm4t2/vue-currency-input/commit/383f469d4a36ca86f0a2b66b8cf6efcb8ba7e652))
* only emit change events if `autoEmit` is enabled (closes [#383](https://github.com/dm4t2/vue-currency-input/issues/383)) ([2cba481](https://github.com/dm4t2/vue-currency-input/commit/2cba481d247c80619f21a58f0994dee830c7e248))
* only emit input event if value has changed ([#65](https://github.com/dm4t2/vue-currency-input/issues/65)) ([770b40a](https://github.com/dm4t2/vue-currency-input/commit/770b40aecbd037d6bc81022a8bdb526314a83e83))
* parseCurrency API method does not consider default options ([ee120c5](https://github.com/dm4t2/vue-currency-input/commit/ee120c5bbe056b7bbcb57bc303023b5c46a5d239))
* **precision:** currency format was broken when min=0 ([#59](https://github.com/dm4t2/vue-currency-input/issues/59)) ([9c1d8b0](https://github.com/dm4t2/vue-currency-input/commit/9c1d8b07fde55e3a54242791e5860786acd694be))
* preserve an existing "inputmode" attribute on the input element (closes [#372](https://github.com/dm4t2/vue-currency-input/issues/372)) ([e9fb330](https://github.com/dm4t2/vue-currency-input/commit/e9fb330d29bbdbde11c1b0b4d8036b692dbbcbaa))
* preserve text selection on focus when distraction free mode is enabled ([f62d7bd](https://github.com/dm4t2/vue-currency-input/commit/f62d7bd592004f6e1c2fb9d62cb8a85789e6221e)), closes [#31](https://github.com/dm4t2/vue-currency-input/issues/31)
* prevent caret position from jumping to the end ([#268](https://github.com/dm4t2/vue-currency-input/issues/268)) ([8f048d7](https://github.com/dm4t2/vue-currency-input/commit/8f048d7e846d4e8ba06c0b77b61df497b00f37bf))
* prevent entering of non-numeric characters in &lt;v-text-field&gt; in Firefox ([#175](https://github.com/dm4t2/vue-currency-input/issues/175)) ([4b2f751](https://github.com/dm4t2/vue-currency-input/commit/4b2f75172f60f031cd075365016214071a8f0b3b))
* prevent input of numbers greater than Number.MAX_SAFE_INTEGER ([#129](https://github.com/dm4t2/vue-currency-input/issues/129)) ([6e2788d](https://github.com/dm4t2/vue-currency-input/commit/6e2788d7e9c4ecf09461ec8536bb7c6dd89007ad))
* prevent input of too large numbers ([7a94509](https://github.com/dm4t2/vue-currency-input/commit/7a945099975423c2b981e8a9df0dcb1f3d7f46e8))
* remove "browser" field from package.json ([23c3be7](https://github.com/dm4t2/vue-currency-input/commit/23c3be755403d2bde6775e5d1c46302640d86240)), closes [#13](https://github.com/dm4t2/vue-currency-input/issues/13)
* remove required node version again ([#96](https://github.com/dm4t2/vue-currency-input/issues/96)) ([0204eff](https://github.com/dm4t2/vue-currency-input/commit/0204efffc4fbfc11ed9c4308824eec261600a381))
* remove unnecessary input event on blur ([90dc505](https://github.com/dm4t2/vue-currency-input/commit/90dc505da46f461ca561fdaf7b3067dc648d702e)), closes [#42](https://github.com/dm4t2/vue-currency-input/issues/42)
* reset the position of the last entered decimal separator ([#140](https://github.com/dm4t2/vue-currency-input/issues/140)) ([686445e](https://github.com/dm4t2/vue-currency-input/commit/686445ec940ae52e0b2dd9d5321be3c928da2199))
* rollback to the v-model default behavior using the input event ([50741f4](https://github.com/dm4t2/vue-currency-input/commit/50741f44ecff4df8e86ef349c81eb9a303abf6a3)), closes [#10](https://github.com/dm4t2/vue-currency-input/issues/10)
* set caret position correctly on focus ([da8d861](https://github.com/dm4t2/vue-currency-input/commit/da8d8613bbaca1c7184f843cd936aac9fd590102))
* simplify determination of currency format digits ([#104](https://github.com/dm4t2/vue-currency-input/issues/104), [#105](https://github.com/dm4t2/vue-currency-input/issues/105)) ([06604f4](https://github.com/dm4t2/vue-currency-input/commit/06604f4bf4b26129649c045660f6b5acd32eea9a))
* suffixed currency symbol disappears when deleting chars ([452ca3a](https://github.com/dm4t2/vue-currency-input/commit/452ca3a7db573d5265b15f4475d56ff18d820503))
* support indian formatted numbers ([#181](https://github.com/dm4t2/vue-currency-input/issues/181)) ([d4539ff](https://github.com/dm4t2/vue-currency-input/commit/d4539ff7f93d87a63a4fb44669646398e9601a08))
* support Indian formatted numbers ([#181](https://github.com/dm4t2/vue-currency-input/issues/181)) ([b3218a7](https://github.com/dm4t2/vue-currency-input/commit/b3218a7432ef83818533c89faff91c8e7d4d0cfd))
* support locale dependent minus symbols ([#84](https://github.com/dm4t2/vue-currency-input/issues/84)) ([dc7aff2](https://github.com/dm4t2/vue-currency-input/commit/dc7aff2e72d55906e329f1af492502a01be903f6))
* suppress formatting on focus/blur if input is empty ([#134](https://github.com/dm4t2/vue-currency-input/issues/134)) ([3385a66](https://github.com/dm4t2/vue-currency-input/commit/3385a66e7f3d13f04d03e8f9bf7869fc62e76caa))
* trigger change event if initial value is outside the value range ([#122](https://github.com/dm4t2/vue-currency-input/issues/122)) ([d59b972](https://github.com/dm4t2/vue-currency-input/commit/d59b9725b898f569e9266e006002faef174f3216))
* trigger change when pressing enter ([#125](https://github.com/dm4t2/vue-currency-input/issues/125)) ([0efaf75](https://github.com/dm4t2/vue-currency-input/commit/0efaf75b275571ad753c6f570c7d1cbea65a825a))
* **types:** setValue should support null value ([#191](https://github.com/dm4t2/vue-currency-input/issues/191)) ([9e7505a](https://github.com/dm4t2/vue-currency-input/commit/9e7505a7220f3153277a2464a7b9507803be2cc6))
* **types:** update useCurrencyInput return type ([4f19a56](https://github.com/dm4t2/vue-currency-input/commit/4f19a56b2492738b2233d7da499be35b6d006694))
* typo in file name ([e8b868e](https://github.com/dm4t2/vue-currency-input/commit/e8b868e6b978c9726bd96975dd03bff0b604e42f))
* update TypeScript types ([0f75b76](https://github.com/dm4t2/vue-currency-input/commit/0f75b76375d7b1700c8c7e6c10d0307a39283ee4))
* use always the correct number format options ([#127](https://github.com/dm4t2/vue-currency-input/issues/127)) ([f90e8e1](https://github.com/dm4t2/vue-currency-input/commit/f90e8e1503b1062209a099643298ba8d9b5b4901))
* use blur event for lazy value binding (closes [#322](https://github.com/dm4t2/vue-currency-input/issues/322)) ([eaeb864](https://github.com/dm4t2/vue-currency-input/commit/eaeb8640629036f62a59f42ffbbd6ad996c491a0))
* **valueAsInteger:** value was incorrectly parsed when ends with a decimal symbol ([02207a3](https://github.com/dm4t2/vue-currency-input/commit/02207a3c00a96268736996a3238a8559a02dc565))


### Reverts

* remove option `decimalDigitsReplacement` ([c62aaef](https://github.com/dm4t2/vue-currency-input/commit/c62aaeffdd8417234d3d8510fe22f3628056fa68))


### Miscellaneous Chores

* **main:** release 3.2.1 ([3432e18](https://github.com/dm4t2/vue-currency-input/commit/3432e18eb6e27bf5fb9e388495ceb1e3f8f87d5b))


### Code Refactoring

* drop precision range ([#203](https://github.com/dm4t2/vue-currency-input/issues/203)) ([887f30c](https://github.com/dm4t2/vue-currency-input/commit/887f30c0e529a3d632ab20582d4f359bee2a1420))
* migrate to TypeScript, use Vite & VitePress ([59523cf](https://github.com/dm4t2/vue-currency-input/commit/59523cfe10e0fe141d914fee116048b99587de3e))

## [3.2.2](https://github.com/dm4t2/vue-currency-input/compare/3.2.1...3.2.2) (2025-12-17)


### Bug Fixes

* **autoDecimalDigits:** Ignore input of decimal symbol ([#389](https://github.com/dm4t2/vue-currency-input/issues/389)) ([4cee284](https://github.com/dm4t2/vue-currency-input/commit/4cee28446dd0d9d9d5d0dfbe190cd49254b74017))

## [3.2.1](https://github.com/dm4t2/vue-currency-input/compare/3.2.0...3.2.1) (2025-01-19)

This version contains no changes and only fixes the corrupt v3.2.0 release.

## [3.2.0](https://github.com/dm4t2/vue-currency-input/compare/3.1.0...3.2.0) (2025-01-18)


### Features

* Allow value scaling by 10,000 ([443321d](https://github.com/dm4t2/vue-currency-input/commit/443321d50bc8e73ed41fa3c553614012fb951745))

## [3.1.0](https://github.com/dm4t2/vue-currency-input/compare/3.0.5...3.1.0) (2024-02-07)


### Features

* Support Chinese dot as decimal separator ([b4ecd1a](https://github.com/dm4t2/vue-currency-input/commit/b4ecd1a1bbd7440036157f4271e831266d656e5b))

## [3.0.5](https://github.com/dm4t2/vue-currency-input/compare/3.0.4...3.0.5) (2023-05-26)


### Bug Fixes

* only emit change events if `autoEmit` is enabled (closes [#383](https://github.com/dm4t2/vue-currency-input/issues/383)) ([2cba481](https://github.com/dm4t2/vue-currency-input/commit/2cba481d247c80619f21a58f0994dee830c7e248))

## [3.0.4](https://github.com/dm4t2/vue-currency-input/compare/3.0.3...3.0.4) (2023-03-30)


### Bug Fixes

* preserve an existing "inputmode" attribute on the input element (closes [#372](https://github.com/dm4t2/vue-currency-input/issues/372)) ([e9fb330](https://github.com/dm4t2/vue-currency-input/commit/e9fb330d29bbdbde11c1b0b4d8036b692dbbcbaa))
* use blur event for lazy value binding (closes [#322](https://github.com/dm4t2/vue-currency-input/issues/322)) ([eaeb864](https://github.com/dm4t2/vue-currency-input/commit/eaeb8640629036f62a59f42ffbbd6ad996c491a0))

## [3.0.3](https://github.com/dm4t2/vue-currency-input/compare/3.0.2...3.0.3) (2022-12-03)


### Bug Fixes

* change default value of option `useGrouping` ([#296](https://github.com/dm4t2/vue-currency-input/issues/296)) ([a37963e](https://github.com/dm4t2/vue-currency-input/commit/a37963ec4dcf42b528bf2e4aec628745f4513bb7))

## [3.0.2](https://github.com/dm4t2/vue-currency-input/compare/3.0.1...3.0.2) (2022-10-30)


### Bug Fixes

* **build:** fix ESM export ([04b512c](https://github.com/dm4t2/vue-currency-input/commit/04b512c23c525704297125c99a1aa94cb553a8b1))

## [3.0.1](https://github.com/dm4t2/vue-currency-input/compare/3.0.0...3.0.1) (2022-10-02)


### Bug Fixes

* fix cursor jumps with input component of Quasar/Element Plus ([59b8b40](https://github.com/dm4t2/vue-currency-input/commit/59b8b405211c0fa0f337b118ab8d46001f030da6))
