# Defer Image Loading

Defer loading for images that are below the fold line, mainly for mobile optimization.
This will make the images below the fold line show only after user interaction: scroll or resize.
This way you will speed up loading, save bandwidth, and rise your Google page speed score.

### Configuration
```
imgClass: the class of the images that will be defered.
srcSelector: the source src from where the image path will be taken
```
1. Add the imgClass you defined in the script to all images that you want to defer. 
2. Add the real source of the image as a data attribute as defined in the srcSelector.

### Example usage
```
imgClass: 'defer-img-js'
srcSelector: 'data-src'
```

```
<div id="aboveTheFoldLineContent">
  <div class="defer-img-js" data-src="https://example.com/img1.jpg"></div>
  <div class="defer-img-js" data-src="https://example.com/img2.jpg"></div>
  <div class="defer-img-js" data-src="https://example.com/img3.jpg"></div>
</div>
<img class="defer-img-js" data-src="https://example.com/img.jpg" src="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==" />
<div class="defer-img-js" data-src="https://example.com/img.jpg"></div>
```

```
deferLoading.init('aboveTheFoldLineContent');
```

In the above case after you run the script it will bind event listeners for scroll and resize. When any of these events occure,
the elements with the imgClass will be fetched from the page and if they have src (images) the data-src will be added as their src.
For the elements that aren't images a background-image style with the data-src will be applied.

When calling the script you can pass a parameter which is the ID of the element that is expectedto be above the fold line. 
Its child elements will be calculated and the ones that are above the fold line will automatically receive their src, 
the rest will have to wait until the user interaction occure.

You can pass either a single string with the ID or an array:
```
deferLoading.init('aboveTheFoldLineContent');
deferLoading.init(['aboveTheFoldLineContent1', 'aboveTheFoldLine2']);
```

The listeners will be unbinded automatically when the user interaction occures.
