import{_ as n,c as a,o as s,a as e}from"./app.3863e367.js";const y='{"title":"API","description":"","frontmatter":{},"headers":[{"level":2,"title":"Functions","slug":"functions"},{"level":3,"title":"useCurrencyInput","slug":"usecurrencyinput"},{"level":2,"title":"Enums","slug":"enums"},{"level":3,"title":"CurrencyDisplay","slug":"currencydisplay"},{"level":3,"title":"ValueScaling","slug":"valuescaling"},{"level":2,"title":"Interfaces","slug":"interfaces"},{"level":3,"title":"NumberRange","slug":"numberrange"},{"level":3,"title":"CurrencyFormatOptions","slug":"currencyformatoptions"},{"level":3,"title":"CurrencyInputOptions","slug":"currencyinputoptions"},{"level":3,"title":"UseCurrencyInput","slug":"usecurrencyinput-1"}],"relativePath":"api.md"}',t={},p=e(`<h1 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h1><h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-hidden="true">#</a></h2><h3 id="usecurrencyinput" tabindex="-1">useCurrencyInput <a class="header-anchor" href="#usecurrencyinput" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">declare</span> <span class="token keyword">const</span> <span class="token function-variable function">useCurrencyInput</span><span class="token operator">:</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> CurrencyInputOptions<span class="token punctuation">,</span> autoEmit<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> UseCurrencyInput
</code></pre></div><h2 id="enums" tabindex="-1">Enums <a class="header-anchor" href="#enums" aria-hidden="true">#</a></h2><h3 id="currencydisplay" tabindex="-1">CurrencyDisplay <a class="header-anchor" href="#currencydisplay" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">enum</span> CurrencyDisplay <span class="token punctuation">{</span>
  <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token string">&#39;symbol&#39;</span><span class="token punctuation">,</span>
  narrowSymbol <span class="token operator">=</span> <span class="token string">&#39;narrowSymbol&#39;</span><span class="token punctuation">,</span>
  code <span class="token operator">=</span> <span class="token string">&#39;code&#39;</span><span class="token punctuation">,</span>
  name <span class="token operator">=</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span>
  hidden <span class="token operator">=</span> <span class="token string">&#39;hidden&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="valuescaling" tabindex="-1">ValueScaling <a class="header-anchor" href="#valuescaling" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">enum</span> ValueScaling <span class="token punctuation">{</span>
  precision <span class="token operator">=</span> <span class="token string">&#39;precision&#39;</span><span class="token punctuation">,</span>
  thousands <span class="token operator">=</span> <span class="token string">&#39;thousands&#39;</span><span class="token punctuation">,</span>
  millions <span class="token operator">=</span> <span class="token string">&#39;millions&#39;</span><span class="token punctuation">,</span>
  billions <span class="token operator">=</span> <span class="token string">&#39;billions&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="interfaces" tabindex="-1">Interfaces <a class="header-anchor" href="#interfaces" aria-hidden="true">#</a></h2><h3 id="numberrange" tabindex="-1">NumberRange <a class="header-anchor" href="#numberrange" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">interface</span> <span class="token class-name">NumberRange</span> <span class="token punctuation">{</span>
  min<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
  max<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="currencyformatoptions" tabindex="-1">CurrencyFormatOptions <a class="header-anchor" href="#currencyformatoptions" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">interface</span> <span class="token class-name">CurrencyFormatOptions</span> <span class="token punctuation">{</span>
  locale<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
  currency<span class="token operator">:</span> <span class="token builtin">string</span>
  currencyDisplay<span class="token operator">?</span><span class="token operator">:</span> CurrencyDisplay
  precision<span class="token operator">?</span><span class="token operator">:</span> NumberRange <span class="token operator">|</span> <span class="token builtin">number</span>
  accountingSign<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="currencyinputoptions" tabindex="-1">CurrencyInputOptions <a class="header-anchor" href="#currencyinputoptions" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">interface</span> <span class="token class-name">CurrencyInputOptions</span> <span class="token keyword">extends</span> <span class="token class-name">CurrencyFormatOptions</span> <span class="token punctuation">{</span>
  hideCurrencySymbolOnFocus<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  hideGroupingSeparatorOnFocus<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  hideNegligibleDecimalDigitsOnFocus<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  autoDecimalDigits<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  valueRange<span class="token operator">?</span><span class="token operator">:</span> NumberRange
  useGrouping<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  valueScaling<span class="token operator">?</span><span class="token operator">:</span> ValueScaling
<span class="token punctuation">}</span>
</code></pre></div><h3 id="usecurrencyinput-1" tabindex="-1">UseCurrencyInput <a class="header-anchor" href="#usecurrencyinput-1" aria-hidden="true">#</a></h3><div class="language-typescript"><pre><code><span class="token keyword">interface</span> <span class="token class-name">UseCurrencyInput</span> <span class="token punctuation">{</span>
  inputRef<span class="token operator">:</span> Ref
  numberValue<span class="token operator">:</span> Ref<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span>
  formattedValue<span class="token operator">:</span> Ref<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span>
  <span class="token function-variable function">setValue</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function-variable function">setOptions</span><span class="token operator">:</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> CurrencyInputOptions<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>
</code></pre></div>`,18),o=[p];function r(c,l,i,u,k,d){return s(),a("div",null,o)}var g=n(t,[["render",r]]);export{y as __pageData,g as default};
