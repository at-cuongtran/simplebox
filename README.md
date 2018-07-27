A simple and lightweight JQuery plugin to display lightbox.

# Alternative or is it?

I'm not trying to take over the world, other plugins are just too big for me. If you want a robust, browser compatiple with tons of options, consider try this [fancybox](https://github.com/fancyapps/fancybox).

# Installation

> Require JQuery >= 1.9.0

You can install [simplebox](https://www.npmjs.com/package/simplebox) with npm:
```
npm install simplebox
```

Or manually import

```html
<script type="text/javascript" src="/simplebox/simplebox.js"></script>
<link rel="stylesheet" href="/simplebox/simplebox.css" type="text/css" />
```

# Usage

## Initialize

1. Use data attributes
```html
<a href="image.jpg" data-simplebox>
  <img src="thumbnail.jpg" alt="" />
</a>
```
> NOTE: using data attributes, simplebox will not be initilized until a click occurs

2. Use Javascript
```js
$('.js-simplebox').simplebox({
  // Options go here, but not required
});
```

## Slide show

1. data attributes

All the elements with the same `data-simplebox` will be grouped into one gallery

```html
<a href="image1.jpg" data-simplebox='gallery-1'>
  <img src="thumbnail1.jpg" alt="" />
</a>
<a href="image2.jpg" data-simplebox='gallery-1'>
  <img src="thumbnail2.jpg" alt="" />
</a>
<a href="image3.jpg" data-simplebox='gallery-1'>
  <img src="thumbnail3.jpg" alt="" />
</a>

<a href="image4.jpg" data-simplebox='gallery-2'>
  <img src="thumbnail4.jpg" alt="" />
</a>
<a href="image5.jpg" data-simplebox='gallery-2'>
  <img src="thumbnail5.jpg" alt="" />
</a>
<a href="image6.jpg" data-simplebox='gallery-2'>
  <img src="thumbnail5.jpg" alt="" />
</a>
```

2. Javascript

All the elements given by the JQuery object will be grouped into one gallery

```js
$('js-gallery-1').simplebox();
```

## Available references

After initialize simplebox you can access its modal references by using `$.simplebox`

```js
$.simplebox.$modal        // JQuery object of the modal
$.simplebox.$modalTarget  // JQuery object of the image inside modal
$.simplebox.$loader       // JQuery object of the loader
$.simplebox.$next         // JQuery object of the next button
$.simplebox.$back         // JQuery object of the back button
$.simplebox.defaults      // Defaults options
```
# Options

These are the supported options and their default values:

```js
$.simplebox.defaults = {
  fadeDuration: 200,        // {number} Duration of the fading animation of the modal
  modalClass: '',           // {string} Additional class that you want for the modal
  complete: function() {},  // {function} A function that run when the animation of the open complete
  loading: true,            // {boolean} Show A loader that appears after modal showed up and before image loaded
  slideShow: true,          // {boolean} Open modal with slide show function
  infinityLoop: false       // {boolean} Only works with slideShow options
};
```
I'm sorry there are not many. 

# Want to contribute? 

Create a pull request :))

# License (MIT)

Simplebox is distributed under the [MIT License](http://opensource.org/licenses/mit-license.php):

    Copyright (c) 2018 Cuong Tran H.P.

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
