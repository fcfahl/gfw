/**
 * The layers filter module.
 *
 * @return singleton instance of layers fitler class (extends Backbone.View).
 */
define([
  'backbone',
  'underscore',
  'presenters/LayersNavPresenter',
  'handlebars',
  'text!templates/layersNav.handlebars'
], function(Backbone, _, Presenter, Handlebars, tpl) {

  'use strict';

  var LayersNavView = Backbone.View.extend({

    el: '.layers-menu',
    template: Handlebars.compile(tpl),

    events: {
      'click .layer': '_toggleLayer'
    },

    initialize: function() {
      _.bindAll(this, '_toggleSelected');
      this.presenter = new Presenter(this);
      this.render();
    },

    render: function() {
      this.$el.append(this.template());
    },

    /**
     * Used by LayersNavPresenter to toggle the class
     * name selected.
     *
     * @param  {object} layerSpec
     */
    _toggleSelected: function(layers) {
      // Toggle sublayers
      _.each(this.$el.find('.layer'), function(li) {
        var $li = $(li);
        var $toggle = $li.find('.onoffradio, .onoffswitch');
        var $layerTitle = $li.find('.layer-title');
        var layer = layers[$li.data('layer')];

        if (layer) {
          var isBaselayer = (layer.category_slug === 'forest_clearing');
          var color = isBaselayer ? layer.category_color : layer.title_color;

          $li.addClass('selected');
          $toggle.addClass('checked');
          $layerTitle.css('color', color);

          if (!isBaselayer) {
            $toggle.css('background', color);
          }
        } else {
          $li.removeClass('selected');
          $toggle.removeClass('checked').css('background', '');
          $layerTitle.css('color', '');
        }
      });
    },

    /**
     * Handles a toggle layer change UI event by dispatching
     * to LayersNavPresenter.
     *
     * @param  {event} event Click event
     */
    _toggleLayer: function(event) {
      var layerSlug = $(event.currentTarget).data('layer');

      this.presenter.toggleLayer(layerSlug);
    },

  });

  return LayersNavView;

});
