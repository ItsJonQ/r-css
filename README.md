<img src="https://raw.githubusercontent.com/ItsJonQ/rxs/master/images/rxs-logo-2x.png" width="111">

### rxs: Reactive CSS

Super fast dynamic CSS rules.<br>
Dependency-free at 1.3 KB minified!

## Getting Started
```
npm install rxs --save
```

## Quick Example

For this example, we want the height of any element with the class of `.fun-height` to be exactly 65% of the window's height, in `px`. It should also update everytime the browser is resized.

```html
<div class="card fun-height">
  ...
</div>

<!-- Add the reactive-css script -->
<script src="../js/rxs.min.js"></script>
```

In our Javascript, we'll define the Reactive CSS rule. We can set/update the rule by using the `.set()` method everytime the window is resized.

```js
// Add a new CSS rule to the Reactive Stylesheet
var funHeightCSS = rxs('.fun-height');

window.addEventListener('resize', function() {
  // Everytime the window is resized, update the height property for
  // the class `.fun-height` to a computed height
  funHeightCSS.set({
    height: (window.innerHeight * 0.65) + 'px',
  });
});
```


## Example Demo
Clone this repo, and open up the [example/index.html](https://github.com/ItsJonQ/rxs/blob/master/example/index.html) file.
