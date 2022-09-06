<?php

$function = new Twig_SimpleFunction('setAttributes', function ($className, $attributes) {
  if (!empty($attributes)) {
    if (method_exists($attributes,'addClass')) {
      $attributes->addClass($className);
    }
  }
   else {
     $attributes = 'class=' . $className;
   }
  return $attributes;
});

?>
