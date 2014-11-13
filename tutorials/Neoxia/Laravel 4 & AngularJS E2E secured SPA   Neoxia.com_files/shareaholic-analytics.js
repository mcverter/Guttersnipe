if (!document.getElementById('shr_oven') && !document.getElementById('shr-analytics')) {
  script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'shr-analytics';
  script.async = true;
  script.src = '//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic_analytics.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}