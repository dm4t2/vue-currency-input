# API

## getValue
Returns the current number value of an input. This method is also exposed as Vue instance method `$ci.getValue` when [installed as Vue plugin](/guide/#installation).

#### Arguments
Name | Description
--- | --- | --- 
`ref` | The HTML element or Vue component the `v-currency` directive is bound to.

#### Returns
The current number value or `null` if empty.

#### Example
<iframe src="https://codesandbox.io/embed/vue-currency-input-get-number-value-r8kig?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="Vue Currency Input: Get number value" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" ></iframe>

## setValue
Sets the value of an input programmatically. This method is also exposed as Vue instance method `$ci.setValue` when [installed as Vue plugin](/guide/#installation).

#### Arguments
Name | Description
--- | --- | --- 
`ref` | The HTML element or Vue component the `v-currency` directive is bound to.
`value` | The number to be set or `null` to clear the input. 

#### Example
<iframe src="https://codesandbox.io/embed/vue-currency-input-set-value-programmatically-rv95r?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="Vue Currency Input: Set value programmatically" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" ></iframe>
