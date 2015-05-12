window.widgets = window.widgets || {};
window.widgets.userMenu = (function () {

	// data
	var Option = Backbone.Model.extend({
		defaults: function () {
			var _this = this;
			return {
				text: "Default value",
				link: _this.defaultBehaviour,
				linkIsFunction: false,
				// in order to avoid passing code of function into href of an "a" tag
				action: {}
			}
		},
		defaultBehaviour: function () {
			alert("Default alert. Wanna change? Go to UserMenu widget' initialization");
		}
	});
	var Options = Backbone.Collection.extend({
		model: Option
	});
	// views
	var OptionView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: _.template['option'],
		events: {
			"click": "click"
		},
		initialize: function () {
			if (typeof this.model.get("link") == 'function') {
				this.model.set("linkIsFunction", true);
				this.model.set("action", this.model.get("link"));
				this.model.set("link", "#");
			}
		},
		click: function (e) {
			if (this.model.get("linkIsFunction")) {
				e.preventDefault();
				this.model.get("action")();
			}
		}
	});
	var OptionsView = Backbone.Marionette.CollectionView.extend({
		el: "@options",
		childView: OptionView
	});
	var UserMenuView = Backbone.Marionette.ItemView.extend({
		el: "@logout",
		events: {
			"click": "toggleContent"
		},
		template: _.template['template'],
		onRender: function () {
			var _this = this;
			new OptionsView({
				collection: new Options(
					this.options.options || [new Option()]
				)
			}).render();
			// hide if clicked somewhere else
			$(document).on("click", $.proxy(_this.hideContent, _this));
		},
		toggleContent: function () {
			// we have to put smart logic of hide/showing of content element here 
			// i thing we can initialize here diferent module, something like "toggler" but better
			this.$("@userMenuContent").toggle();
		},
		hideContent: function (e) {
			if ($(e.target).closest("@userMenu").length == 0) {
				this.$("@userMenuContent").hide();
			}
		}
	});

	return {
		init: function (options) {
			// we have to add options here. 
			// for example "template", in order to plug different templates for different use cases.
			new UserMenuView({ el: options.el, options: options.options }).render();
		}
	};
})();