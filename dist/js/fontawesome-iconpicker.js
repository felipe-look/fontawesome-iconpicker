/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
	if (typeof define === "function" && define.amd) {
		define([ "jquery" ], e);
	} else {
		e(jQuery);
	}
})(function(j) {
	j.ui = j.ui || {};
	var e = j.ui.version = "1.12.1";
	(function() {
		var r, y = Math.max, x = Math.abs, s = /left|center|right/, i = /top|center|bottom/, f = /[\+\-]\d+(\.[\d]+)?%?/, l = /^\w+/, c = /%$/, a = j.fn.pos;
		function q(e, a, t) {
			return [ parseFloat(e[0]) * (c.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (c.test(e[1]) ? t / 100 : 1) ];
		}
		function C(e, a) {
			return parseInt(j.css(e, a), 10) || 0;
		}
		function t(e) {
			var a = e[0];
			if (a.nodeType === 9) {
				return {
					width: e.width(),
					height: e.height(),
					offset: {
						top: 0,
						left: 0
					}
				};
			}
			if (j.isWindow(a)) {
				return {
					width: e.width(),
					height: e.height(),
					offset: {
						top: e.scrollTop(),
						left: e.scrollLeft()
					}
				};
			}
			if (a.preventDefault) {
				return {
					width: 0,
					height: 0,
					offset: {
						top: a.pageY,
						left: a.pageX
					}
				};
			}
			return {
				width: e.outerWidth(),
				height: e.outerHeight(),
				offset: e.offset()
			};
		}
		j.pos = {
			scrollbarWidth: function() {
				if (r !== undefined) {
					return r;
				}
				var e, a, t = j("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), s = t.children()[0];
				j("body").append(t);
				e = s.offsetWidth;
				t.css("overflow", "scroll");
				a = s.offsetWidth;
				if (e === a) {
					a = t[0].clientWidth;
				}
				t.remove();
				return r = e - a;
			},
			getScrollInfo: function(e) {
				var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), t = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), s = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, r = t === "scroll" || t === "auto" && e.height < e.element[0].scrollHeight;
				return {
					width: r ? j.pos.scrollbarWidth() : 0,
					height: s ? j.pos.scrollbarWidth() : 0
				};
			},
			getWithinInfo: function(e) {
				var a = j(e || window), t = j.isWindow(a[0]), s = !!a[0] && a[0].nodeType === 9, r = !t && !s;
				return {
					element: a,
					isWindow: t,
					isDocument: s,
					offset: r ? j(e).offset() : {
						left: 0,
						top: 0
					},
					scrollLeft: a.scrollLeft(),
					scrollTop: a.scrollTop(),
					width: a.outerWidth(),
					height: a.outerHeight()
				};
			}
		};
		j.fn.pos = function(h) {
			if (!h || !h.of) {
				return a.apply(this, arguments);
			}
			h = j.extend({}, h);
			var m, p, d, u, T, e, g = j(h.of), b = j.pos.getWithinInfo(h.within), k = j.pos.getScrollInfo(b), w = (h.collision || "flip").split(" "), v = {};
			e = t(g);
			if (g[0].preventDefault) {
				h.at = "left top";
			}
			p = e.width;
			d = e.height;
			u = e.offset;
			T = j.extend({}, u);
			j.each([ "my", "at" ], function() {
				var e = (h[this] || "").split(" "), a, t;
				if (e.length === 1) {
					e = s.test(e[0]) ? e.concat([ "center" ]) : i.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
				}
				e[0] = s.test(e[0]) ? e[0] : "center";
				e[1] = i.test(e[1]) ? e[1] : "center";
				a = f.exec(e[0]);
				t = f.exec(e[1]);
				v[this] = [ a ? a[0] : 0, t ? t[0] : 0 ];
				h[this] = [ l.exec(e[0])[0], l.exec(e[1])[0] ];
			});
			if (w.length === 1) {
				w[1] = w[0];
			}
			if (h.at[0] === "right") {
				T.left += p;
			} else if (h.at[0] === "center") {
				T.left += p / 2;
			}
			if (h.at[1] === "bottom") {
				T.top += d;
			} else if (h.at[1] === "center") {
				T.top += d / 2;
			}
			m = q(v.at, p, d);
			T.left += m[0];
			T.top += m[1];
			return this.each(function() {
				var t, e, f = j(this), l = f.outerWidth(), c = f.outerHeight(), a = C(this, "marginLeft"), s = C(this, "marginTop"), r = l + a + C(this, "marginRight") + k.width, i = c + s + C(this, "marginBottom") + k.height, o = j.extend({}, T), n = q(v.my, f.outerWidth(), f.outerHeight());
				if (h.my[0] === "right") {
					o.left -= l;
				} else if (h.my[0] === "center") {
					o.left -= l / 2;
				}
				if (h.my[1] === "bottom") {
					o.top -= c;
				} else if (h.my[1] === "center") {
					o.top -= c / 2;
				}
				o.left += n[0];
				o.top += n[1];
				t = {
					marginLeft: a,
					marginTop: s
				};
				j.each([ "left", "top" ], function(e, a) {
					if (j.ui.pos[w[e]]) {
						j.ui.pos[w[e]][a](o, {
							targetWidth: p,
							targetHeight: d,
							elemWidth: l,
							elemHeight: c,
							collisionPosition: t,
							collisionWidth: r,
							collisionHeight: i,
							offset: [ m[0] + n[0], m[1] + n[1] ],
							my: h.my,
							at: h.at,
							within: b,
							elem: f
						});
					}
				});
				if (h.using) {
					e = function(e) {
						var a = u.left - o.left, t = a + p - l, s = u.top - o.top, r = s + d - c, i = {
							target: {
								element: g,
								left: u.left,
								top: u.top,
								width: p,
								height: d
							},
							element: {
								element: f,
								left: o.left,
								top: o.top,
								width: l,
								height: c
							},
							horizontal: t < 0 ? "left" : a > 0 ? "right" : "center",
							vertical: r < 0 ? "top" : s > 0 ? "bottom" : "middle"
						};
						if (p < l && x(a + t) < p) {
							i.horizontal = "center";
						}
						if (d < c && x(s + r) < d) {
							i.vertical = "middle";
						}
						if (y(x(a), x(t)) > y(x(s), x(r))) {
							i.important = "horizontal";
						} else {
							i.important = "vertical";
						}
						h.using.call(this, e, i);
					};
				}
				f.offset(j.extend(o, {
					using: e
				}));
			});
		};
		j.ui.pos = {
			_trigger: function(e, a, t, s) {
				if (a.elem) {
					a.elem.trigger({
						type: t,
						position: e,
						positionData: a,
						triggered: s
					});
				}
			},
			fit: {
				left: function(e, a) {
					j.ui.pos._trigger(e, a, "posCollide", "fitLeft");
					var t = a.within, s = t.isWindow ? t.scrollLeft : t.offset.left, r = t.width, i = e.left - a.collisionPosition.marginLeft, f = s - i, l = i + a.collisionWidth - r - s, c;
					if (a.collisionWidth > r) {
						if (f > 0 && l <= 0) {
							c = e.left + f + a.collisionWidth - r - s;
							e.left += f - c;
						} else if (l > 0 && f <= 0) {
							e.left = s;
						} else {
							if (f > l) {
								e.left = s + r - a.collisionWidth;
							} else {
								e.left = s;
							}
						}
					} else if (f > 0) {
						e.left += f;
					} else if (l > 0) {
						e.left -= l;
					} else {
						e.left = y(e.left - i, e.left);
					}
					j.ui.pos._trigger(e, a, "posCollided", "fitLeft");
				},
				top: function(e, a) {
					j.ui.pos._trigger(e, a, "posCollide", "fitTop");
					var t = a.within, s = t.isWindow ? t.scrollTop : t.offset.top, r = a.within.height, i = e.top - a.collisionPosition.marginTop, f = s - i, l = i + a.collisionHeight - r - s, c;
					if (a.collisionHeight > r) {
						if (f > 0 && l <= 0) {
							c = e.top + f + a.collisionHeight - r - s;
							e.top += f - c;
						} else if (l > 0 && f <= 0) {
							e.top = s;
						} else {
							if (f > l) {
								e.top = s + r - a.collisionHeight;
							} else {
								e.top = s;
							}
						}
					} else if (f > 0) {
						e.top += f;
					} else if (l > 0) {
						e.top -= l;
					} else {
						e.top = y(e.top - i, e.top);
					}
					j.ui.pos._trigger(e, a, "posCollided", "fitTop");
				}
			},
			flip: {
				left: function(e, a) {
					j.ui.pos._trigger(e, a, "posCollide", "flipLeft");
					var t = a.within, s = t.offset.left + t.scrollLeft, r = t.width, i = t.isWindow ? t.scrollLeft : t.offset.left, f = e.left - a.collisionPosition.marginLeft, l = f - i, c = f + a.collisionWidth - r - i, o = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, n = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, h = -2 * a.offset[0], m, p;
					if (l < 0) {
						m = e.left + o + n + h + a.collisionWidth - r - s;
						if (m < 0 || m < x(l)) {
							e.left += o + n + h;
						}
					} else if (c > 0) {
						p = e.left - a.collisionPosition.marginLeft + o + n + h - i;
						if (p > 0 || x(p) < c) {
							e.left += o + n + h;
						}
					}
					j.ui.pos._trigger(e, a, "posCollided", "flipLeft");
				},
				top: function(e, a) {
					j.ui.pos._trigger(e, a, "posCollide", "flipTop");
					var t = a.within, s = t.offset.top + t.scrollTop, r = t.height, i = t.isWindow ? t.scrollTop : t.offset.top, f = e.top - a.collisionPosition.marginTop, l = f - i, c = f + a.collisionHeight - r - i, o = a.my[1] === "top", n = o ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, h = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, m = -2 * a.offset[1], p, d;
					if (l < 0) {
						d = e.top + n + h + m + a.collisionHeight - r - s;
						if (d < 0 || d < x(l)) {
							e.top += n + h + m;
						}
					} else if (c > 0) {
						p = e.top - a.collisionPosition.marginTop + n + h + m - i;
						if (p > 0 || x(p) < c) {
							e.top += n + h + m;
						}
					}
					j.ui.pos._trigger(e, a, "posCollided", "flipTop");
				}
			},
			flipfit: {
				left: function() {
					j.ui.pos.flip.left.apply(this, arguments);
					j.ui.pos.fit.left.apply(this, arguments);
				},
				top: function() {
					j.ui.pos.flip.top.apply(this, arguments);
					j.ui.pos.fit.top.apply(this, arguments);
				}
			}
		};
		(function() {
			var e, a, t, s, r, i = document.getElementsByTagName("body")[0], f = document.createElement("div");
			e = document.createElement(i ? "div" : "body");
			t = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			};
			if (i) {
				j.extend(t, {
					position: "absolute",
					left: "-1000px",
					top: "-1000px"
				});
			}
			for (r in t) {
				e.style[r] = t[r];
			}
			e.appendChild(f);
			a = i || document.documentElement;
			a.insertBefore(e, a.firstChild);
			f.style.cssText = "position: absolute; left: 10.7432222px;";
			s = j(f).offset().left;
			j.support.offsetFractions = s > 10 && s < 11;
			e.innerHTML = "";
			a.removeChild(e);
		})();
	})();
	var a = j.ui.position;
});

(function(e) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define([ "jquery" ], e);
	} else if (window.jQuery && !window.jQuery.fn.iconpicker) {
		e(window.jQuery);
	}
})(function(c) {
	"use strict";
	var f = {
		isEmpty: function(e) {
			return e === false || e === "" || e === null || e === undefined;
		},
		isEmptyObject: function(e) {
			return this.isEmpty(e) === true || e.length === 0;
		},
		isElement: function(e) {
			return c(e).length > 0;
		},
		isString: function(e) {
			return typeof e === "string" || e instanceof String;
		},
		isArray: function(e) {
			return c.isArray(e);
		},
		inArray: function(e, a) {
			return c.inArray(e, a) !== -1;
		},
		throwError: function(e) {
			throw "Font Awesome Icon Picker Exception: " + e;
		}
	};
	var t = function(e, a) {
		this._id = t._idCounter++;
		this.element = c(e).addClass("iconpicker-element");
		this._trigger("iconpickerCreate", {
			iconpickerValue: this.iconpickerValue
		});
		this.options = c.extend({}, t.defaultOptions, this.element.data(), a);
		this.options.templates = c.extend({}, t.defaultOptions.templates, this.options.templates);
		this.options.originalPlacement = this.options.placement;
		this.container = f.isElement(this.options.container) ? c(this.options.container) : false;
		if (this.container === false) {
			if (this.element.is(".dropdown-toggle")) {
				this.container = c("~ .dropdown-menu:first", this.element);
			} else {
				this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
			}
		}
		this.container.addClass("iconpicker-container");
		if (this.isDropdownMenu()) {
			this.options.placement = "inline";
		}
		this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
		if (this.input === false) {
			this.input = this.container.find(this.options.input);
			if (!this.input.is("input,textarea")) {
				this.input = false;
			}
		}
		this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
		if (this.component.length === 0) {
			this.component = false;
		} else {
			this.component.find("i").addClass("iconpicker-component");
		}
		this._createPopover();
		this._createIconpicker();
		if (this.getAcceptButton().length === 0) {
			this.options.mustAccept = false;
		}
		if (this.isInputGroup()) {
			this.container.parent().append(this.popover);
		} else {
			this.container.append(this.popover);
		}
		this._bindElementEvents();
		this._bindWindowEvents();
		this.update(this.options.selected);
		if (this.isInline()) {
			this.show();
		}
		this._trigger("iconpickerCreated", {
			iconpickerValue: this.iconpickerValue
		});
	};
	t._idCounter = 0;
	t.defaultOptions = {
		title: false,
		selected: false,
		defaultValue: false,
		placement: "bottom",
		collision: "none",
		animation: true,
		hideOnSelect: false,
		showFooter: false,
		searchInFooter: false,
		mustAccept: false,
		selectedCustomClass: "bg-primary",
		icons: [],
		fullClassFormatter: function(e) {
			return e;
		},
		input: "input,.iconpicker-input",
		inputSearch: false,
		container: false,
		component: ".input-group-addon,.iconpicker-component",
		templates: {
			popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
			footer: '<div class="popover-footer"></div>',
			buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
			search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
			iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
			iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
		}
	};
	t.batch = function(e, a) {
		var t = Array.prototype.slice.call(arguments, 2);
		return c(e).each(function() {
			var e = c(this).data("iconpicker");
			if (!!e) {
				e[a].apply(e, t);
			}
		});
	};
	t.prototype = {
		constructor: t,
		options: {},
		_id: 0,
		_trigger: function(e, a) {
			a = a || {};
			this.element.trigger(c.extend({
				type: e,
				iconpickerInstance: this
			}, a));
		},
		_createPopover: function() {
			this.popover = c(this.options.templates.popover);
			var e = this.popover.find(".popover-title");
			if (!!this.options.title) {
				e.append(c('<div class="popover-title-text">' + this.options.title + "</div>"));
			}
			if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
				e.append(this.options.templates.search);
			} else if (!this.options.title) {
				e.remove();
			}
			if (this.options.showFooter && !f.isEmpty(this.options.templates.footer)) {
				var a = c(this.options.templates.footer);
				if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
					a.append(c(this.options.templates.search));
				}
				if (!f.isEmpty(this.options.templates.buttons)) {
					a.append(c(this.options.templates.buttons));
				}
				this.popover.append(a);
			}
			if (this.options.animation === true) {
				this.popover.addClass("fade");
			}
			return this.popover;
		},
		_createIconpicker: function() {
			var t = this;
			this.iconpicker = c(this.options.templates.iconpicker);
			var e = function(e) {
				var a = c(this);
				if (a.is("i")) {
					a = a.parent();
				}
				t._trigger("iconpickerSelect", {
					iconpickerItem: a,
					iconpickerValue: t.iconpickerValue
				});
				if (t.options.mustAccept === false) {
					t.update(a.data("iconpickerValue"));
					t._trigger("iconpickerSelected", {
						iconpickerItem: this,
						iconpickerValue: t.iconpickerValue
					});
				} else {
					t.update(a.data("iconpickerValue"), true);
				}
				if (t.options.hideOnSelect && t.options.mustAccept === false) {
					t.hide();
				}
			};
			var a = c(this.options.templates.iconpickerItem);
			var s = [];
			for (var r in this.options.icons) {
				if (typeof this.options.icons[r].title === "string") {
					var i = a.clone();
					i.find("i").addClass(this.options.fullClassFormatter(this.options.icons[r].title));
					i.data("iconpickerValue", this.options.icons[r].title).on("click.iconpicker", e);
					i.attr("title", "." + this.options.icons[r].title);
					if (this.options.icons[r].searchTerms.length > 0) {
						var f = "";
						for (var l = 0; l < this.options.icons[r].searchTerms.length; l++) {
							f = f + this.options.icons[r].searchTerms[l] + " ";
						}
						i.attr("data-search-terms", f);
					}
					s.push(i);
				}
			}
			this.iconpicker.find(".iconpicker-items").append(s);
			this.popover.find(".popover-content").append(this.iconpicker);
			return this.iconpicker;
		},
		_isEventInsideIconpicker: function(e) {
			var a = c(e.target);
			if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
				return false;
			}
			return true;
		},
		_bindElementEvents: function() {
			var a = this;
			this.getSearchInput().on("keyup.iconpicker", function() {
				a.filter(c(this).val().toLowerCase());
			});
			this.getAcceptButton().on("click.iconpicker", function() {
				var e = a.iconpicker.find(".iconpicker-selected").get(0);
				a.update(a.iconpickerValue);
				a._trigger("iconpickerSelected", {
					iconpickerItem: e,
					iconpickerValue: a.iconpickerValue
				});
				if (!a.isInline()) {
					a.hide();
				}
			});
			this.getCancelButton().on("click.iconpicker", function() {
				if (!a.isInline()) {
					a.hide();
				}
			});
			this.element.on("focus.iconpicker", function(e) {
				a.show();
				e.stopPropagation();
			});
			if (this.hasComponent()) {
				this.component.on("click.iconpicker", function() {
					a.toggle();
				});
			}
			if (this.hasInput()) {
				this.input.on("keyup.iconpicker", function(e) {
					if (!f.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
						a.update();
					} else {
						a._updateFormGroupStatus(a.getValid(this.value) !== false);
					}
					if (a.options.inputSearch === true) {
						a.filter(c(this).val().toLowerCase());
					}
				});
			}
		},
		_bindWindowEvents: function() {
			var e = c(window.document);
			var a = this;
			var t = ".iconpicker.inst" + this._id;
			c(window).on("resize.iconpicker" + t + " orientationchange.iconpicker" + t, function(e) {
				if (a.popover.hasClass("in")) {
					a.updatePlacement();
				}
			});
			if (!a.isInline()) {
				e.on("mouseup" + t, function(e) {
					if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
						a.hide();
					}
				});
			}
		},
		_unbindElementEvents: function() {
			this.popover.off(".iconpicker");
			this.element.off(".iconpicker");
			if (this.hasInput()) {
				this.input.off(".iconpicker");
			}
			if (this.hasComponent()) {
				this.component.off(".iconpicker");
			}
			if (this.hasContainer()) {
				this.container.off(".iconpicker");
			}
		},
		_unbindWindowEvents: function() {
			c(window).off(".iconpicker.inst" + this._id);
			c(window.document).off(".iconpicker.inst" + this._id);
		},
		updatePlacement: function(e, a) {
			e = e || this.options.placement;
			this.options.placement = e;
			a = a || this.options.collision;
			a = a === true ? "flip" : a;
			var t = {
				at: "right bottom",
				my: "right top",
				of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
				collision: a === true ? "flip" : a,
				within: window
			};
			this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
			if (typeof e === "object") {
				return this.popover.pos(c.extend({}, t, e));
			}
			switch (e) {
			  case "inline":
				{
					t = false;
				}
				break;

			  case "topLeftCorner":
				{
					t.my = "right bottom";
					t.at = "left top";
				}
				break;

			  case "topLeft":
				{
					t.my = "left bottom";
					t.at = "left top";
				}
				break;

			  case "top":
				{
					t.my = "center bottom";
					t.at = "center top";
				}
				break;

			  case "topRight":
				{
					t.my = "right bottom";
					t.at = "right top";
				}
				break;

			  case "topRightCorner":
				{
					t.my = "left bottom";
					t.at = "right top";
				}
				break;

			  case "rightTop":
				{
					t.my = "left bottom";
					t.at = "right center";
				}
				break;

			  case "right":
				{
					t.my = "left center";
					t.at = "right center";
				}
				break;

			  case "rightBottom":
				{
					t.my = "left top";
					t.at = "right center";
				}
				break;

			  case "bottomRightCorner":
				{
					t.my = "left top";
					t.at = "right bottom";
				}
				break;

			  case "bottomRight":
				{
					t.my = "right top";
					t.at = "right bottom";
				}
				break;

			  case "bottom":
				{
					t.my = "center top";
					t.at = "center bottom";
				}
				break;

			  case "bottomLeft":
				{
					t.my = "left top";
					t.at = "left bottom";
				}
				break;

			  case "bottomLeftCorner":
				{
					t.my = "right top";
					t.at = "left bottom";
				}
				break;

			  case "leftBottom":
				{
					t.my = "right top";
					t.at = "left center";
				}
				break;

			  case "left":
				{
					t.my = "right center";
					t.at = "left center";
				}
				break;

			  case "leftTop":
				{
					t.my = "right bottom";
					t.at = "left center";
				}
				break;

			  default:
				{
					return false;
				}
				break;
			}
			this.popover.css({
				display: this.options.placement === "inline" ? "" : "block"
			});
			if (t !== false) {
				this.popover.pos(t).css("maxWidth", c(window).width() - this.container.offset().left - 5);
			} else {
				this.popover.css({
					top: "auto",
					right: "auto",
					bottom: "auto",
					left: "auto",
					maxWidth: "none"
				});
			}
			this.popover.addClass(this.options.placement);
			return true;
		},
		_updateComponents: function() {
			this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
			if (this.iconpickerValue) {
				this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
			}
			if (this.hasComponent()) {
				var e = this.component.find("i");
				if (e.length > 0) {
					e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
				} else {
					this.component.html(this.getHtml());
				}
			}
		},
		_updateFormGroupStatus: function(e) {
			if (this.hasInput()) {
				if (e !== false) {
					this.input.parents(".form-group:first").removeClass("has-error");
				} else {
					this.input.parents(".form-group:first").addClass("has-error");
				}
				return true;
			}
			return false;
		},
		getValid: function(e) {
			if (!f.isString(e)) {
				e = "";
			}
			var a = e === "";
			e = c.trim(e);
			var t = false;
			for (var s = 0; s < this.options.icons.length; s++) {
				if (this.options.icons[s].title === e) {
					t = true;
					break;
				}
			}
			if (t || a) {
				return e;
			}
			return false;
		},
		setValue: function(e) {
			var a = this.getValid(e);
			if (a !== false) {
				this.iconpickerValue = a;
				this._trigger("iconpickerSetValue", {
					iconpickerValue: a
				});
				return this.iconpickerValue;
			} else {
				this._trigger("iconpickerInvalid", {
					iconpickerValue: e
				});
				return false;
			}
		},
		getHtml: function() {
			return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
		},
		setSourceValue: function(e) {
			e = this.setValue(e);
			if (e !== false && e !== "") {
				if (this.hasInput()) {
					this.input.val(this.iconpickerValue);
				} else {
					this.element.data("iconpickerValue", this.iconpickerValue);
				}
				this._trigger("iconpickerSetSourceValue", {
					iconpickerValue: e
				});
			}
			return e;
		},
		getSourceValue: function(e) {
			e = e || this.options.defaultValue;
			var a = e;
			if (this.hasInput()) {
				a = this.input.val();
			} else {
				a = this.element.data("iconpickerValue");
			}
			if (a === undefined || a === "" || a === null || a === false) {
				a = e;
			}
			return a;
		},
		hasInput: function() {
			return this.input !== false;
		},
		isInputSearch: function() {
			return this.hasInput() && this.options.inputSearch === true;
		},
		isInputGroup: function() {
			return this.container.is(".input-group");
		},
		isDropdownMenu: function() {
			return this.container.is(".dropdown-menu");
		},
		hasSeparatedSearchInput: function() {
			return this.options.templates.search !== false && !this.isInputSearch();
		},
		hasComponent: function() {
			return this.component !== false;
		},
		hasContainer: function() {
			return this.container !== false;
		},
		getAcceptButton: function() {
			return this.popover.find(".iconpicker-btn-accept");
		},
		getCancelButton: function() {
			return this.popover.find(".iconpicker-btn-cancel");
		},
		getSearchInput: function() {
			return this.popover.find(".iconpicker-search");
		},
		filter: function(r) {
			if (f.isEmpty(r)) {
				this.iconpicker.find(".iconpicker-item").show();
				return c(false);
			} else {
				var i = [];
				this.iconpicker.find(".iconpicker-item").each(function() {
					var e = c(this);
					var a = e.attr("title").toLowerCase();
					var t = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
					a = a + " " + t;
					var s = false;
					try {
						s = new RegExp("(^|\\W)" + r, "g");
					} catch (e) {
						s = false;
					}
					if (s !== false && a.match(s)) {
						i.push(e);
						e.show();
					} else {
						e.hide();
					}
				});
				return i;
			}
		},
		show: function() {
			if (this.popover.hasClass("in")) {
				return false;
			}
			c.iconpicker.batch(c(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
			this._trigger("iconpickerShow", {
				iconpickerValue: this.iconpickerValue
			});
			this.updatePlacement();
			this.popover.addClass("in");
			setTimeout(c.proxy(function() {
				this.popover.css("display", this.isInline() ? "" : "block");
				this._trigger("iconpickerShown", {
					iconpickerValue: this.iconpickerValue
				});
			}, this), this.options.animation ? 300 : 1);
		},
		hide: function() {
			if (!this.popover.hasClass("in")) {
				return false;
			}
			this._trigger("iconpickerHide", {
				iconpickerValue: this.iconpickerValue
			});
			this.popover.removeClass("in");
			setTimeout(c.proxy(function() {
				this.popover.css("display", "none");
				this.getSearchInput().val("");
				this.filter("");
				this._trigger("iconpickerHidden", {
					iconpickerValue: this.iconpickerValue
				});
			}, this), this.options.animation ? 300 : 1);
		},
		toggle: function() {
			if (this.popover.is(":visible")) {
				this.hide();
			} else {
				this.show(true);
			}
		},
		update: function(e, a) {
			e = e ? e : this.getSourceValue(this.iconpickerValue);
			this._trigger("iconpickerUpdate", {
				iconpickerValue: this.iconpickerValue
			});
			if (a === true) {
				e = this.setValue(e);
			} else {
				e = this.setSourceValue(e);
				this._updateFormGroupStatus(e !== false);
			}
			if (e !== false) {
				this._updateComponents();
			}
			this._trigger("iconpickerUpdated", {
				iconpickerValue: this.iconpickerValue
			});
			return e;
		},
		destroy: function() {
			this._trigger("iconpickerDestroy", {
				iconpickerValue: this.iconpickerValue
			});
			this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
			this._unbindElementEvents();
			this._unbindWindowEvents();
			c(this.popover).remove();
			this._trigger("iconpickerDestroyed", {
				iconpickerValue: this.iconpickerValue
			});
		},
		disable: function() {
			if (this.hasInput()) {
				this.input.prop("disabled", true);
				return true;
			}
			return false;
		},
		enable: function() {
			if (this.hasInput()) {
				this.input.prop("disabled", false);
				return true;
			}
			return false;
		},
		isDisabled: function() {
			if (this.hasInput()) {
				return this.input.prop("disabled") === true;
			}
			return false;
		},
		isInline: function() {
			return this.options.placement === "inline" || this.popover.hasClass("inline");
		}
	};
	c.iconpicker = t;
	c.fn.iconpicker = function(a) {
		return this.each(function() {
			var e = c(this);
			if (!e.data("iconpicker")) {
				e.data("iconpicker", new t(this, typeof a === "object" ? a : {}));
			}
		});
	};
	t.defaultOptions = c.extend(t.defaultOptions, {
		icons: [
		{
			"title": "fa-solid fa-0",
			"searchTerms": ["Digit Zero", "nada", "none", "zero", "zilch"]
		},
		{
			"title": "fa-solid fa-1",
			"searchTerms": ["Digit One", "one"]
		},
		{
			"title": "fa-solid fa-2",
			"searchTerms": ["Digit Two", "two"]
		},
		{
			"title": "fa-solid fa-3",
			"searchTerms": ["Digit Three", "three"]
		},
		{
			"title": "fa-solid fa-4",
			"searchTerms": ["Digit Four", "four"]
		},
		{
			"title": "fa-solid fa-5",
			"searchTerms": ["Digit Five", "five"]
		},
		{
			"title": "fa-solid fa-6",
			"searchTerms": ["Digit Six", "six"]
		},
		{
			"title": "fa-solid fa-7",
			"searchTerms": ["Digit Seven", "seven"]
		},
		{
			"title": "fa-solid fa-8",
			"searchTerms": ["Digit Eight", "eight"]
		},
		{
			"title": "fa-solid fa-9",
			"searchTerms": ["Digit Nine", "nine"]
		},
		{
			"title": "fa-brands fa-42-group",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-500px",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-a",
			"searchTerms": ["Latin Capital Letter A", "Latin Small Letter A", "letter"]
		},
		{
			"title": "fa-brands fa-accessible-icon",
			"searchTerms": ["accessibility", "handicap", "person", "wheelchair", "wheelchair-alt"]
		},
		{
			"title": "fa-brands fa-accusoft",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-address-book",
			"searchTerms": ["contact", "directory", "index", "little black book", "rolodex"]
		},
		{
			"title": "fa-regular fa-address-book",
			"searchTerms": ["contact", "directory", "index", "little black book", "rolodex"]
		},
		{
			"title": "fa-regular fa-address-card",
			"searchTerms": ["about", "contact", "id", "identification", "postcard", "profile", "registration"]
		},
		{
			"title": "fa-regular fa-address-card",
			"searchTerms": ["about", "contact", "id", "identification", "postcard", "profile", "registration"]
		},
		{
			"title": "fa-brands fa-adn",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-adversal",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-affiliatetheme",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-airbnb",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-algolia",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-align-center",
			"searchTerms": ["format", "middle", "paragraph", "text"]
		},
		{
			"title": "fa-solid fa-align-justify",
			"searchTerms": ["format", "paragraph", "text"]
		},
		{
			"title": "fa-solid fa-align-left",
			"searchTerms": ["format", "paragraph", "text"]
		},
		{
			"title": "fa-solid fa-align-right",
			"searchTerms": ["format", "paragraph", "text"]
		},
		{
			"title": "fa-brands fa-alipay",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-amazon",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-amazon-pay",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-amilia",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-anchor",
			"searchTerms": ["anchor", "berth", "boat", "dock", "embed", "link", "maritime", "moor", "port", "secure", "ship", "tool"]
		},
		{
			"title": "fa-solid fa-anchor-circle-check",
			"searchTerms": ["marina", "not affected", "ok", "okay", "port"]
		},
		{
			"title": "fa-solid fa-anchor-circle-exclamation",
			"searchTerms": ["affected", "marina", "port"]
		},
		{
			"title": "fa-solid fa-anchor-circle-xmark",
			"searchTerms": ["destroy", "marina", "port"]
		},
		{
			"title": "fa-solid fa-anchor-lock",
			"searchTerms": ["closed", "lockdown", "marina", "port", "quarantine"]
		},
		{
			"title": "fa-brands fa-android",
			"searchTerms": ["robot"]
		},
		{
			"title": "fa-brands fa-angellist",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-angle-down",
			"searchTerms": ["Down Arrowhead", "arrow", "caret", "download", "expand"]
		},
		{
			"title": "fa-solid fa-angle-left",
			"searchTerms": ["Single Left-Pointing Angle Quotation Mark", "arrow", "back", "caret", "less", "previous"]
		},
		{
			"title": "fa-solid fa-angle-right",
			"searchTerms": ["Single Right-Pointing Angle Quotation Mark", "arrow", "care", "forward", "more", "next"]
		},
		{
			"title": "fa-solid fa-angle-up",
			"searchTerms": ["Up Arrowhead", "arrow", "caret", "collapse", "upload"]
		},
		{
			"title": "fa-solid fa-angles-down",
			"searchTerms": ["arrows", "caret", "download", "expand"]
		},
		{
			"title": "fa-solid fa-angles-left",
			"searchTerms": ["Left-Pointing Double Angle Quotation Mark", "arrows", "back", "caret", "laquo", "previous", "quote"]
		},
		{
			"title": "fa-solid fa-angles-right",
			"searchTerms": ["Right-Pointing Double Angle Quotation Mark", "arrows", "caret", "forward", "more", "next", "quote", "raquo"]
		},
		{
			"title": "fa-solid fa-angles-up",
			"searchTerms": ["arrows", "caret", "collapse", "upload"]
		},
		{
			"title": "fa-brands fa-angrycreative",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-angular",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-ankh",
			"searchTerms": ["Ankh", "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egypt", "venus"]
		},
		{
			"title": "fa-brands fa-app-store",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-app-store-ios",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-apper",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-apple",
			"searchTerms": ["fruit", "ios", "mac", "operating system", "os", "osx"]
		},
		{
			"title": "fa-brands fa-apple-pay",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-apple-whole",
			"searchTerms": ["apple", "fall", "fruit", "fuji", "green", "green apple", "macintosh", "orchard", "red", "red apple", "seasonal", "vegan"]
		},
		{
			"title": "fa-solid fa-archway",
			"searchTerms": ["arc", "monument", "road", "street", "tunnel"]
		},
		{
			"title": "fa-solid fa-arrow-down",
			"searchTerms": ["Downwards Arrow", "download"]
		},
		{
			"title": "fa-solid fa-arrow-down-1-9",
			"searchTerms": ["arrange", "filter", "numbers", "order", "sort-numeric-asc"]
		},
		{
			"title": "fa-solid fa-arrow-down-9-1",
			"searchTerms": ["arrange", "filter", "numbers", "order", "sort-numeric-asc"]
		},
		{
			"title": "fa-solid fa-arrow-down-a-z",
			"searchTerms": ["alphabetical", "arrange", "filter", "order", "sort-alpha-asc"]
		},
		{
			"title": "fa-solid fa-arrow-down-long",
			"searchTerms": ["download", "long-arrow-down"]
		},
		{
			"title": "fa-solid fa-arrow-down-short-wide",
			"searchTerms": ["arrange", "filter", "order", "sort-amount-asc"]
		},
		{
			"title": "fa-solid fa-arrow-down-up-across-line",
			"searchTerms": ["border", "crossing", "transfer"]
		},
		{
			"title": "fa-solid fa-arrow-down-up-lock",
			"searchTerms": ["border", "closed", "crossing", "lockdown", "quarantine", "transfer"]
		},
		{
			"title": "fa-solid fa-arrow-down-wide-short",
			"searchTerms": ["arrange", "filter", "number", "order", "sort-amount-asc"]
		},
		{
			"title": "fa-solid fa-arrow-down-z-a",
			"searchTerms": ["alphabetical", "arrange", "filter", "order", "sort-alpha-asc"]
		},
		{
			"title": "fa-solid fa-arrow-left",
			"searchTerms": ["Leftwards Arrow", "back", "previous"]
		},
		{
			"title": "fa-solid fa-arrow-left-long",
			"searchTerms": ["back", "long-arrow-left", "previous"]
		},
		{
			"title": "fa-solid fa-arrow-pointer",
			"searchTerms": ["arrow", "cursor", "select"]
		},
		{
			"title": "fa-solid fa-arrow-right",
			"searchTerms": ["Rightwards Arrow", "forward", "next"]
		},
		{
			"title": "fa-solid fa-arrow-right-arrow-left",
			"searchTerms": ["Rightwards Arrow Over Leftwards Arrow", "arrow", "arrows", "reciprocate", "return", "swap", "transfer"]
		},
		{
			"title": "fa-solid fa-arrow-right-from-bracket",
			"searchTerms": ["arrow", "exit", "leave", "log out", "logout"]
		},
		{
			"title": "fa-solid fa-arrow-right-long",
			"searchTerms": ["forward", "long-arrow-right", "next"]
		},
		{
			"title": "fa-solid fa-arrow-right-to-bracket",
			"searchTerms": ["arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup"]
		},
		{
			"title": "fa-solid fa-arrow-right-to-city",
			"searchTerms": ["building", "city", "exodus", "rural", "urban"]
		},
		{
			"title": "fa-solid fa-arrow-rotate-left",
			"searchTerms": ["Anticlockwise Open Circle Arrow", "back", "control z", "exchange", "oops", "return", "rotate", "swap"]
		},
		{
			"title": "fa-solid fa-arrow-rotate-right",
			"searchTerms": ["Clockwise Open Circle Arrow", "forward", "refresh", "reload", "repeat"]
		},
		{
			"title": "fa-solid fa-arrow-trend-down",
			"searchTerms": ["line", "stocks", "trend"]
		},
		{
			"title": "fa-solid fa-arrow-trend-up",
			"searchTerms": ["line", "stocks", "trend"]
		},
		{
			"title": "fa-solid fa-arrow-turn-down",
			"searchTerms": ["arrow"]
		},
		{
			"title": "fa-solid fa-arrow-turn-up",
			"searchTerms": ["arrow"]
		},
		{
			"title": "fa-solid fa-arrow-up",
			"searchTerms": ["Upwards Arrow", "forward", "upload"]
		},
		{
			"title": "fa-solid fa-arrow-up-1-9",
			"searchTerms": ["arrange", "filter", "numbers", "order", "sort-numeric-desc"]
		},
		{
			"title": "fa-solid fa-arrow-up-9-1",
			"searchTerms": ["arrange", "filter", "numbers", "order", "sort-numeric-desc"]
		},
		{
			"title": "fa-solid fa-arrow-up-a-z",
			"searchTerms": ["alphabetical", "arrange", "filter", "order", "sort-alpha-desc"]
		},
		{
			"title": "fa-solid fa-arrow-up-from-bracket",
			"searchTerms": ["share", "transfer", "upload"]
		},
		{
			"title": "fa-solid fa-arrow-up-from-ground-water",
			"searchTerms": ["groundwater", "spring", "water supply", "water table"]
		},
		{
			"title": "fa-solid fa-arrow-up-from-water-pump",
			"searchTerms": ["flood", "groundwater", "pump", "submersible", "sump pump"]
		},
		{
			"title": "fa-solid fa-arrow-up-long",
			"searchTerms": ["long-arrow-up", "upload"]
		},
		{
			"title": "fa-solid fa-arrow-up-right-dots",
			"searchTerms": ["growth", "increase", "population"]
		},
		{
			"title": "fa-solid fa-arrow-up-right-from-square",
			"searchTerms": ["new", "open", "send", "share"]
		},
		{
			"title": "fa-solid fa-arrow-up-short-wide",
			"searchTerms": ["arrange", "filter", "order", "sort-amount-desc"]
		},
		{
			"title": "fa-solid fa-arrow-up-wide-short",
			"searchTerms": ["arrange", "filter", "order", "sort-amount-desc"]
		},
		{
			"title": "fa-solid fa-arrow-up-z-a",
			"searchTerms": ["alphabetical", "arrange", "filter", "order", "sort-alpha-desc"]
		},
		{
			"title": "fa-solid fa-arrows-down-to-line",
			"searchTerms": ["scale down", "sink"]
		},
		{
			"title": "fa-solid fa-arrows-down-to-people",
			"searchTerms": ["affected", "focus", "targeted"]
		},
		{
			"title": "fa-solid fa-arrows-left-right",
			"searchTerms": ["expand", "horizontal", "landscape", "resize", "wide"]
		},
		{
			"title": "fa-solid fa-arrows-left-right-to-line",
			"searchTerms": ["analysis", "expand", "gap"]
		},
		{
			"title": "fa-solid fa-arrows-rotate",
			"searchTerms": ["Clockwise Right and Left Semicircle Arrows", "exchange", "refresh", "reload", "rotate", "swap"]
		},
		{
			"title": "fa-solid fa-arrows-spin",
			"searchTerms": ["cycle", "rotate", "spin", "whirl"]
		},
		{
			"title": "fa-solid fa-arrows-split-up-and-left",
			"searchTerms": ["agile", "split"]
		},
		{
			"title": "fa-solid fa-arrows-to-circle",
			"searchTerms": ["center", "concentrate", "coordinate", "coordination", "focal point", "focus"]
		},
		{
			"title": "fa-solid fa-arrows-to-dot",
			"searchTerms": ["assembly point", "center", "condense", "focus", "minimize"]
		},
		{
			"title": "fa-solid fa-arrows-to-eye",
			"searchTerms": ["center", "coordinated assessment", "focus"]
		},
		{
			"title": "fa-solid fa-arrows-turn-right",
			"searchTerms": ["arrows"]
		},
		{
			"title": "fa-solid fa-arrows-turn-to-dots",
			"searchTerms": ["destination", "nexus"]
		},
		{
			"title": "fa-solid fa-arrows-up-down",
			"searchTerms": ["expand", "portrait", "resize", "tall", "vertical"]
		},
		{
			"title": "fa-solid fa-arrows-up-down-left-right",
			"searchTerms": ["arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize"]
		},
		{
			"title": "fa-solid fa-arrows-up-to-line",
			"searchTerms": ["rise", "scale up"]
		},
		{
			"title": "fa-brands fa-artstation",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-asterisk",
			"searchTerms": ["Asterisk", "Heavy Asterisk", "annotation", "details", "reference", "star"]
		},
		{
			"title": "fa-brands fa-asymmetrik",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-at",
			"searchTerms": ["Commercial At", "address", "author", "e-mail", "email", "fluctuate", "handle"]
		},
		{
			"title": "fa-brands fa-atlassian",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-atom",
			"searchTerms": ["atheism", "atheist", "atom", "atom symbol", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science"]
		},
		{
			"title": "fa-brands fa-audible",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-audio-description",
			"searchTerms": ["blind", "narration", "video", "visual"]
		},
		{
			"title": "fa-solid fa-austral-sign",
			"searchTerms": ["Austral Sign", "currency"]
		},
		{
			"title": "fa-brands fa-autoprefixer",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-avianex",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-aviato",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-award",
			"searchTerms": ["honor", "praise", "prize", "recognition", "ribbon", "trophy"]
		},
		{
			"title": "fa-brands fa-aws",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-b",
			"searchTerms": ["Latin Capital Letter B", "Latin Small Letter B", "letter"]
		},
		{
			"title": "fa-solid fa-baby",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-baby-carriage",
			"searchTerms": ["buggy", "carrier", "infant", "push", "stroller", "transportation", "walk", "wheels"]
		},
		{
			"title": "fa-solid fa-backward",
			"searchTerms": ["arrow", "double", "fast reverse button", "previous", "rewind"]
		},
		{
			"title": "fa-solid fa-backward-fast",
			"searchTerms": ["arrow", "beginning", "first", "last track button", "previous", "previous scene", "previous track", "rewind", "start", "triangle"]
		},
		{
			"title": "fa-solid fa-backward-step",
			"searchTerms": ["beginning", "first", "previous", "rewind", "start"]
		},
		{
			"title": "fa-solid fa-bacon",
			"searchTerms": ["bacon", "blt", "breakfast", "food", "ham", "lard", "meat", "pancetta", "pork", "rasher"]
		},
		{
			"title": "fa-solid fa-bacteria",
			"searchTerms": ["antibiotic", "antibody", "covid-19", "health", "organism", "sick"]
		},
		{
			"title": "fa-solid fa-bacterium",
			"searchTerms": ["antibiotic", "antibody", "covid-19", "health", "organism", "sick"]
		},
		{
			"title": "fa-solid fa-bag-shopping",
			"searchTerms": ["buy", "checkout", "grocery", "payment", "purchase"]
		},
		{
			"title": "fa-solid fa-bahai",
			"searchTerms": ["bahai", "bahá'í", "star"]
		},
		{
			"title": "fa-solid fa-baht-sign",
			"searchTerms": ["currency"]
		},
		{
			"title": "fa-solid fa-ban",
			"searchTerms": ["abort", "ban", "block", "cancel", "delete", "entry", "forbidden", "hide", "no", "not", "prohibit", "prohibited", "remove", "stop", "trash"]
		},
		{
			"title": "fa-solid fa-ban-smoking",
			"searchTerms": ["ban", "cancel", "forbidden", "no", "no smoking", "non-smoking", "not", "prohibited", "smoking"]
		},
		{
			"title": "fa-solid fa-bandage",
			"searchTerms": ["adhesive bandage", "bandage", "boo boo", "first aid", "ouch"]
		},
		{
			"title": "fa-brands fa-bandcamp",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bangladeshi-taka-sign",
			"searchTerms": ["bdt", "currency", "tk"]
		},
		{
			"title": "fa-solid fa-barcode",
			"searchTerms": ["info", "laser", "price", "scan", "upc"]
		},
		{
			"title": "fa-solid fa-bars",
			"searchTerms": ["checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul"]
		},
		{
			"title": "fa-solid fa-bars-progress",
			"searchTerms": ["checklist", "downloading", "downloads", "loading", "poll", "progress", "project management", "settings", "to do"]
		},
		{
			"title": "fa-solid fa-bars-staggered",
			"searchTerms": ["flow", "list", "timeline"]
		},
		{
			"title": "fa-solid fa-baseball",
			"searchTerms": ["ball", "baseball", "foul", "glove", "hardball", "league", "leather", "mlb", "softball", "sport", "underarm"]
		},
		{
			"title": "fa-solid fa-baseball-bat-ball",
			"searchTerms": ["bat", "league", "mlb", "slugger", "softball", "sport"]
		},
		{
			"title": "fa-solid fa-basket-shopping",
			"searchTerms": ["buy", "checkout", "grocery", "payment", "purchase"]
		},
		{
			"title": "fa-solid fa-basketball",
			"searchTerms": ["ball", "basketball", "dribble", "dunk", "hoop", "nba"]
		},
		{
			"title": "fa-solid fa-bath",
			"searchTerms": ["bath", "bathtub", "clean", "shower", "tub", "wash"]
		},
		{
			"title": "fa-solid fa-battery-empty",
			"searchTerms": ["charge", "dead", "power", "status"]
		},
		{
			"title": "fa-solid fa-battery-full",
			"searchTerms": ["batter", "battery", "charge", "power", "status"]
		},
		{
			"title": "fa-solid fa-battery-half",
			"searchTerms": ["charge", "power", "status"]
		},
		{
			"title": "fa-solid fa-battery-quarter",
			"searchTerms": ["charge", "low", "power", "status"]
		},
		{
			"title": "fa-solid fa-battery-three-quarters",
			"searchTerms": ["charge", "power", "status"]
		},
		{
			"title": "fa-brands fa-battle-net",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bed",
			"searchTerms": ["hospital", "hotel", "lodging", "mattress", "patient", "person in bed", "rest", "sleep", "travel"]
		},
		{
			"title": "fa-solid fa-bed-pulse",
			"searchTerms": ["EKG", "bed", "electrocardiogram", "health", "hospital", "life", "patient", "vital"]
		},
		{
			"title": "fa-solid fa-beer-mug-empty",
			"searchTerms": ["alcohol", "ale", "bar", "beverage", "brew", "brewery", "drink", "foam", "lager", "liquor", "mug", "stein"]
		},
		{
			"title": "fa-brands fa-behance",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-bell",
			"searchTerms": ["alarm", "alert", "bel", "bell", "chime", "notification", "reminder"]
		},
		{
			"title": "fa-regular fa-bell",
			"searchTerms": ["alarm", "alert", "bel", "bell", "chime", "notification", "reminder"]
		},
		{
			"title": "fa-solid fa-bell-concierge",
			"searchTerms": ["attention", "bell", "bellhop", "bellhop bell", "hotel", "receptionist", "service", "support"]
		},
		{
			"title": "fa-regular fa-bell-slash",
			"searchTerms": ["alert", "bell", "bell with slash", "cancel", "disabled", "forbidden", "mute", "notification", "off", "quiet", "reminder", "silent"]
		},
		{
			"title": "fa-regular fa-bell-slash",
			"searchTerms": ["alert", "bell", "bell with slash", "cancel", "disabled", "forbidden", "mute", "notification", "off", "quiet", "reminder", "silent"]
		},
		{
			"title": "fa-solid fa-bezier-curve",
			"searchTerms": ["curves", "illustrator", "lines", "path", "vector"]
		},
		{
			"title": "fa-solid fa-bicycle",
			"searchTerms": ["bicycle", "bike", "gears", "pedal", "transportation", "vehicle"]
		},
		{
			"title": "fa-brands fa-bilibili",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-bimobject",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-binoculars",
			"searchTerms": ["glasses", "magnify", "scenic", "spyglass", "view"]
		},
		{
			"title": "fa-solid fa-biohazard",
			"searchTerms": ["biohazard", "covid-19", "danger", "dangerous", "epidemic", "hazmat", "medical", "pandemic", "radioactive", "sign", "toxic", "waste", "zombie"]
		},
		{
			"title": "fa-brands fa-bitbucket",
			"searchTerms": ["atlassian", "bitbucket-square", "git"]
		},
		{
			"title": "fa-brands fa-bitcoin",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bitcoin-sign",
			"searchTerms": ["Bitcoin Sign", "currency"]
		},
		{
			"title": "fa-brands fa-bity",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-black-tie",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-blackberry",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-blender",
			"searchTerms": ["cocktail", "milkshake", "mixer", "puree", "smoothie"]
		},
		{
			"title": "fa-solid fa-blender-phone",
			"searchTerms": ["appliance", "cocktail", "fantasy", "milkshake", "mixer", "puree", "silly", "smoothie"]
		},
		{
			"title": "fa-solid fa-blog",
			"searchTerms": ["journal", "log", "online", "personal", "post", "web 2.0", "wordpress", "writing"]
		},
		{
			"title": "fa-brands fa-blogger",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-blogger-b",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-bluetooth",
			"searchTerms": ["signal"]
		},
		{
			"title": "fa-brands fa-bluetooth-b",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bold",
			"searchTerms": ["emphasis", "format", "text"]
		},
		{
			"title": "fa-solid fa-bolt",
			"searchTerms": ["charge", "danger", "electric", "electricity", "flash", "high voltage", "lightning", "voltage", "weather", "zap"]
		},
		{
			"title": "fa-solid fa-bolt-lightning",
			"searchTerms": ["electricity", "flash", "lightning", "weather", "zap"]
		},
		{
			"title": "fa-solid fa-bomb",
			"searchTerms": ["bomb", "comic", "error", "explode", "fuse", "grenade", "warning"]
		},
		{
			"title": "fa-solid fa-bone",
			"searchTerms": ["bone", "calcium", "dog", "skeletal", "skeleton", "tibia"]
		},
		{
			"title": "fa-solid fa-bong",
			"searchTerms": ["aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking"]
		},
		{
			"title": "fa-solid fa-book",
			"searchTerms": ["book", "cover", "decorated", "diary", "documentation", "journal", "library", "notebook", "notebook with decorative cover", "read", "research"]
		},
		{
			"title": "fa-solid fa-book-atlas",
			"searchTerms": ["book", "directions", "geography", "globe", "library", "map", "research", "travel", "wayfinding"]
		},
		{
			"title": "fa-solid fa-book-bible",
			"searchTerms": ["book", "catholicism", "christianity", "god", "holy"]
		},
		{
			"title": "fa-solid fa-book-bookmark",
			"searchTerms": ["library", "research"]
		},
		{
			"title": "fa-solid fa-book-journal-whills",
			"searchTerms": ["book", "force", "jedi", "sith", "star wars", "yoda"]
		},
		{
			"title": "fa-solid fa-book-medical",
			"searchTerms": ["diary", "documentation", "health", "history", "journal", "library", "read", "record", "research"]
		},
		{
			"title": "fa-solid fa-book-open",
			"searchTerms": ["Book", "book", "flyer", "library", "notebook", "open", "open book", "pamphlet", "reading", "research"]
		},
		{
			"title": "fa-solid fa-book-open-reader",
			"searchTerms": ["flyer", "library", "notebook", "open book", "pamphlet", "reading", "research"]
		},
		{
			"title": "fa-solid fa-book-quran",
			"searchTerms": ["book", "islam", "muslim", "religion"]
		},
		{
			"title": "fa-solid fa-book-skull",
			"searchTerms": ["Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "library", "necronomicon", "read", "research", "skull", "spell"]
		},
		{
			"title": "fa-solid fa-book-tanakh",
			"searchTerms": ["book", "jewish", "judaism", "religion"]
		},
		{
			"title": "fa-regular fa-bookmark",
			"searchTerms": ["bookmark", "favorite", "library", "mark", "marker", "read", "remember", "research", "save"]
		},
		{
			"title": "fa-regular fa-bookmark",
			"searchTerms": ["bookmark", "favorite", "library", "mark", "marker", "read", "remember", "research", "save"]
		},
		{
			"title": "fa-brands fa-bootstrap",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-border-all",
			"searchTerms": ["cell", "grid", "outline", "stroke", "table"]
		},
		{
			"title": "fa-solid fa-border-none",
			"searchTerms": ["cell", "grid", "outline", "stroke", "table"]
		},
		{
			"title": "fa-solid fa-border-top-left",
			"searchTerms": ["cell", "outline", "stroke", "table"]
		},
		{
			"title": "fa-solid fa-bore-hole",
			"searchTerms": ["bore", "bury", "drill", "hole"]
		},
		{
			"title": "fa-brands fa-bots",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bottle-droplet",
			"searchTerms": ["alcohol", "drink", "oil", "olive oil", "wine"]
		},
		{
			"title": "fa-solid fa-bottle-water",
			"searchTerms": ["h2o", "plastic", "water"]
		},
		{
			"title": "fa-solid fa-bowl-food",
			"searchTerms": ["catfood", "dogfood", "food", "rice"]
		},
		{
			"title": "fa-solid fa-bowl-rice",
			"searchTerms": ["boiled", "cooked", "cooked rice", "rice", "steamed"]
		},
		{
			"title": "fa-solid fa-bowling-ball",
			"searchTerms": ["alley", "candlepin", "gutter", "lane", "strike", "tenpin"]
		},
		{
			"title": "fa-solid fa-box",
			"searchTerms": ["archive", "box", "container", "package", "parcel", "storage"]
		},
		{
			"title": "fa-solid fa-box-archive",
			"searchTerms": ["box", "package", "save", "storage"]
		},
		{
			"title": "fa-solid fa-box-open",
			"searchTerms": ["archive", "container", "package", "storage", "unpack"]
		},
		{
			"title": "fa-solid fa-box-tissue",
			"searchTerms": ["cough", "covid-19", "kleenex", "mucus", "nose", "sneeze", "snot"]
		},
		{
			"title": "fa-solid fa-boxes-packing",
			"searchTerms": ["archive", "box", "package", "storage", "supplies"]
		},
		{
			"title": "fa-solid fa-boxes-stacked",
			"searchTerms": ["archives", "inventory", "storage", "warehouse"]
		},
		{
			"title": "fa-solid fa-braille",
			"searchTerms": ["alphabet", "blind", "dots", "raised", "vision"]
		},
		{
			"title": "fa-solid fa-brain",
			"searchTerms": ["brain", "cerebellum", "gray matter", "intellect", "intelligent", "medulla oblongata", "mind", "noodle", "wit"]
		},
		{
			"title": "fa-solid fa-brazilian-real-sign",
			"searchTerms": ["brazilian real sign", "currency"]
		},
		{
			"title": "fa-solid fa-bread-slice",
			"searchTerms": ["bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast"]
		},
		{
			"title": "fa-solid fa-bridge",
			"searchTerms": ["bridge", "road"]
		},
		{
			"title": "fa-solid fa-bridge-circle-check",
			"searchTerms": ["bridge", "not affected", "ok", "okay", "road"]
		},
		{
			"title": "fa-solid fa-bridge-circle-exclamation",
			"searchTerms": ["affected", "bridge", "road"]
		},
		{
			"title": "fa-solid fa-bridge-circle-xmark",
			"searchTerms": ["bridge", "destroy", "road"]
		},
		{
			"title": "fa-solid fa-bridge-lock",
			"searchTerms": ["bridge", "closed", "lockdown", "quarantine", "road"]
		},
		{
			"title": "fa-solid fa-bridge-water",
			"searchTerms": ["bridge", "road"]
		},
		{
			"title": "fa-solid fa-briefcase",
			"searchTerms": ["bag", "briefcas", "briefcase", "business", "luggage", "office", "work"]
		},
		{
			"title": "fa-solid fa-briefcase-medical",
			"searchTerms": ["doctor", "emt", "first aid", "health"]
		},
		{
			"title": "fa-solid fa-broom",
			"searchTerms": ["broom", "clean", "cleaning", "firebolt", "fly", "halloween", "nimbus 2000", "quidditch", "sweep", "sweeping", "witch"]
		},
		{
			"title": "fa-solid fa-broom-ball",
			"searchTerms": ["ball", "bludger", "broom", "golden snitch", "harry potter", "hogwarts", "quaffle", "sport", "wizard"]
		},
		{
			"title": "fa-solid fa-brush",
			"searchTerms": ["art", "bristles", "color", "handle", "paint"]
		},
		{
			"title": "fa-brands fa-btc",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bucket",
			"searchTerms": ["bucket", "pail", "sandcastle"]
		},
		{
			"title": "fa-brands fa-buffer",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-bug",
			"searchTerms": ["beetle", "error", "glitch", "insect", "repair", "report"]
		},
		{
			"title": "fa-solid fa-bug-slash",
			"searchTerms": ["beetle", "fix", "glitch", "insect", "optimize", "repair", "report", "warning"]
		},
		{
			"title": "fa-solid fa-bugs",
			"searchTerms": ["bedbug", "infestation", "lice", "plague", "ticks"]
		},
		{
			"title": "fa-regular fa-building",
			"searchTerms": ["apartment", "building", "business", "city", "company", "office", "office building", "urban", "work"]
		},
		{
			"title": "fa-regular fa-building",
			"searchTerms": ["apartment", "building", "business", "city", "company", "office", "office building", "urban", "work"]
		},
		{
			"title": "fa-solid fa-building-circle-arrow-right",
			"searchTerms": ["building", "city", "distribution center", "office"]
		},
		{
			"title": "fa-solid fa-building-circle-check",
			"searchTerms": ["building", "city", "not affected", "office", "ok", "okay"]
		},
		{
			"title": "fa-solid fa-building-circle-exclamation",
			"searchTerms": ["affected", "building", "city", "office"]
		},
		{
			"title": "fa-solid fa-building-circle-xmark",
			"searchTerms": ["building", "city", "destroy", "office"]
		},
		{
			"title": "fa-solid fa-building-columns",
			"searchTerms": ["bank", "building", "college", "education", "institution", "museum", "students"]
		},
		{
			"title": "fa-solid fa-building-flag",
			"searchTerms": [" city", "building", "diplomat", "embassy", "flag", "headquarters", "united nations"]
		},
		{
			"title": "fa-solid fa-building-lock",
			"searchTerms": ["building", "city", "closed", "lock", "lockdown", "quarantine", "secure"]
		},
		{
			"title": "fa-solid fa-building-ngo",
			"searchTerms": [" city", "building", "non governmental organization", "office"]
		},
		{
			"title": "fa-solid fa-building-shield",
			"searchTerms": ["building", "city", "police", "protect", "safety"]
		},
		{
			"title": "fa-solid fa-building-un",
			"searchTerms": ["building", "city", "office", "united nations"]
		},
		{
			"title": "fa-solid fa-building-user",
			"searchTerms": ["apartment", "building", "city"]
		},
		{
			"title": "fa-solid fa-building-wheat",
			"searchTerms": ["agriculture", "building", "city", "usda"]
		},
		{
			"title": "fa-solid fa-bullhorn",
			"searchTerms": ["Bullhorn", "announcement", "broadcast", "loud", "louder", "loudspeaker", "megaphone", "public address", "share"]
		},
		{
			"title": "fa-solid fa-bullseye",
			"searchTerms": ["archery", "goal", "objective", "strategy", "target"]
		},
		{
			"title": "fa-solid fa-burger",
			"searchTerms": ["bacon", "beef", "burger", "burger king", "cheeseburger", "fast food", "grill", "ground beef", "mcdonalds", "sandwich"]
		},
		{
			"title": "fa-brands fa-buromobelexperte",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-burst",
			"searchTerms": ["boom", "crash", "explosion"]
		},
		{
			"title": "fa-solid fa-bus",
			"searchTerms": ["bus", "oncoming", "oncoming bus", "public transportation", "transportation", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-bus-simple",
			"searchTerms": ["mta", "public transportation", "transportation", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-business-time",
			"searchTerms": ["alarm", "briefcase", "business socks", "clock", "flight of the conchords", "reminder", "wednesday"]
		},
		{
			"title": "fa-brands fa-buy-n-large",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-buysellads",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-c",
			"searchTerms": ["Latin Capital Letter C", "Latin Small Letter C", "letter"]
		},
		{
			"title": "fa-solid fa-cable-car",
			"searchTerms": ["aerial tramway", "cable", "gondola", "lift", "mountain", "mountain cableway", "tram", "tramway", "trolley"]
		},
		{
			"title": "fa-solid fa-cake-candles",
			"searchTerms": ["anniversary", "bakery", "birthday", "birthday cake", "cake", "candles", "celebration", "dessert", "frosting", "holiday", "party", "pastry", "sweet"]
		},
		{
			"title": "fa-solid fa-calculator",
			"searchTerms": ["Pocket Calculator", "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction"]
		},
		{
			"title": "fa-regular fa-calendar",
			"searchTerms": ["calendar", "calendar-o", "date", "day", "event", "month", "schedule", "tear-off calendar", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar",
			"searchTerms": ["calendar", "calendar-o", "date", "day", "event", "month", "schedule", "tear-off calendar", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-check",
			"searchTerms": ["accept", "agree", "appointment", "confirm", "correct", "date", "day", "done", "event", "month", "ok", "schedule", "select", "success", "tick", "time", "todo", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-check",
			"searchTerms": ["accept", "agree", "appointment", "confirm", "correct", "date", "day", "done", "event", "month", "ok", "schedule", "select", "success", "tick", "time", "todo", "when", "year"]
		},
		{
			"title": "fa-solid fa-calendar-day",
			"searchTerms": ["date", "day", "detail", "event", "focus", "month", "schedule", "single day", "time", "today", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-days",
			"searchTerms": ["calendar", "date", "day", "event", "month", "schedule", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-days",
			"searchTerms": ["calendar", "date", "day", "event", "month", "schedule", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-minus",
			"searchTerms": ["calendar", "date", "day", "delete", "event", "month", "negative", "remove", "schedule", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-minus",
			"searchTerms": ["calendar", "date", "day", "delete", "event", "month", "negative", "remove", "schedule", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-plus",
			"searchTerms": ["add", "calendar", "create", "date", "day", "event", "month", "new", "positive", "schedule", "time", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-plus",
			"searchTerms": ["add", "calendar", "create", "date", "day", "event", "month", "new", "positive", "schedule", "time", "when", "year"]
		},
		{
			"title": "fa-solid fa-calendar-week",
			"searchTerms": ["date", "day", "detail", "event", "focus", "month", "schedule", "single week", "time", "today", "when", "year"]
		},
		{
			"title": "fa-regular fa-calendar-xmark",
			"searchTerms": ["archive", "calendar", "date", "day", "delete", "event", "month", "remove", "schedule", "time", "when", "x", "year"]
		},
		{
			"title": "fa-regular fa-calendar-xmark",
			"searchTerms": ["archive", "calendar", "date", "day", "delete", "event", "month", "remove", "schedule", "time", "when", "x", "year"]
		},
		{
			"title": "fa-solid fa-camera",
			"searchTerms": ["image", "lens", "photo", "picture", "record", "shutter", "video"]
		},
		{
			"title": "fa-solid fa-camera-retro",
			"searchTerms": ["camera", "image", "lens", "photo", "picture", "record", "shutter", "video"]
		},
		{
			"title": "fa-solid fa-camera-rotate",
			"searchTerms": ["flip", "front-facing", "photo", "selfie"]
		},
		{
			"title": "fa-solid fa-campground",
			"searchTerms": ["camping", "fall", "outdoors", "teepee", "tent", "tipi"]
		},
		{
			"title": "fa-brands fa-canadian-maple-leaf",
			"searchTerms": ["canada", "flag", "flora", "nature", "plant"]
		},
		{
			"title": "fa-solid fa-candy-cane",
			"searchTerms": ["candy", "christmas", "holiday", "mint", "peppermint", "striped", "xmas"]
		},
		{
			"title": "fa-solid fa-cannabis",
			"searchTerms": ["bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky"]
		},
		{
			"title": "fa-solid fa-capsules",
			"searchTerms": ["drugs", "medicine", "pills", "prescription"]
		},
		{
			"title": "fa-solid fa-car",
			"searchTerms": ["auto", "automobile", "car", "oncoming", "oncoming automobile", "sedan", "transportation", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-car-battery",
			"searchTerms": ["auto", "electric", "mechanic", "power"]
		},
		{
			"title": "fa-solid fa-car-burst",
			"searchTerms": ["accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck"]
		},
		{
			"title": "fa-solid fa-car-on",
			"searchTerms": ["alarm", "car", "carjack", "warning"]
		},
		{
			"title": "fa-solid fa-car-rear",
			"searchTerms": ["auto", "automobile", "sedan", "transportation", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-car-side",
			"searchTerms": ["auto", "automobile", "car", "sedan", "transportation", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-car-tunnel",
			"searchTerms": ["road", "tunnel"]
		},
		{
			"title": "fa-solid fa-caravan",
			"searchTerms": ["camper", "motor home", "rv", "trailer", "travel"]
		},
		{
			"title": "fa-solid fa-caret-down",
			"searchTerms": ["arrow", "dropdown", "expand", "menu", "more", "triangle"]
		},
		{
			"title": "fa-solid fa-caret-left",
			"searchTerms": ["arrow", "back", "previous", "triangle"]
		},
		{
			"title": "fa-solid fa-caret-right",
			"searchTerms": ["arrow", "forward", "next", "triangle"]
		},
		{
			"title": "fa-solid fa-caret-up",
			"searchTerms": ["arrow", "collapse", "triangle"]
		},
		{
			"title": "fa-solid fa-carrot",
			"searchTerms": ["bugs bunny", "carrot", "food", "orange", "vegan", "vegetable"]
		},
		{
			"title": "fa-solid fa-cart-arrow-down",
			"searchTerms": ["download", "save", "shopping"]
		},
		{
			"title": "fa-solid fa-cart-flatbed",
			"searchTerms": ["carry", "inventory", "shipping", "transport"]
		},
		{
			"title": "fa-solid fa-cart-flatbed-suitcase",
			"searchTerms": ["airport", "bag", "baggage", "suitcase", "travel"]
		},
		{
			"title": "fa-solid fa-cart-plus",
			"searchTerms": ["add", "create", "new", "positive", "shopping"]
		},
		{
			"title": "fa-solid fa-cart-shopping",
			"searchTerms": ["buy", "cart", "checkout", "grocery", "payment", "purchase", "shopping", "shopping cart", "trolley"]
		},
		{
			"title": "fa-solid fa-cash-register",
			"searchTerms": ["buy", "cha-ching", "change", "checkout", "commerce", "leaerboard", "machine", "pay", "payment", "purchase", "store"]
		},
		{
			"title": "fa-solid fa-cat",
			"searchTerms": ["cat", "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet"]
		},
		{
			"title": "fa-brands fa-cc-amazon-pay",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-amex",
			"searchTerms": ["amex"]
		},
		{
			"title": "fa-brands fa-cc-apple-pay",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-diners-club",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-discover",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-jcb",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-mastercard",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-paypal",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-stripe",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cc-visa",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-cedi-sign",
			"searchTerms": ["Cedi Sign", "currency"]
		},
		{
			"title": "fa-solid fa-cent-sign",
			"searchTerms": ["Cent Sign", "currency"]
		},
		{
			"title": "fa-brands fa-centercode",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-centos",
			"searchTerms": ["linux", "operating system", "os"]
		},
		{
			"title": "fa-solid fa-certificate",
			"searchTerms": ["badge", "star", "verified"]
		},
		{
			"title": "fa-solid fa-chair",
			"searchTerms": ["chair", "furniture", "seat", "sit"]
		},
		{
			"title": "fa-solid fa-chalkboard",
			"searchTerms": ["blackboard", "learning", "school", "teaching", "whiteboard", "writing"]
		},
		{
			"title": "fa-solid fa-chalkboard-user",
			"searchTerms": ["blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing"]
		},
		{
			"title": "fa-solid fa-champagne-glasses",
			"searchTerms": ["alcohol", "bar", "beverage", "celebrate", "celebration", "champagne", "clink", "clinking glasses", "drink", "glass", "holiday", "new year's eve", "party", "toast"]
		},
		{
			"title": "fa-solid fa-charging-station",
			"searchTerms": ["electric", "ev", "tesla", "vehicle"]
		},
		{
			"title": "fa-solid fa-chart-area",
			"searchTerms": ["analytics", "area", "chart", "graph"]
		},
		{
			"title": "fa-regular fa-chart-bar",
			"searchTerms": ["analytics", "bar", "chart", "graph"]
		},
		{
			"title": "fa-regular fa-chart-bar",
			"searchTerms": ["analytics", "bar", "chart", "graph"]
		},
		{
			"title": "fa-solid fa-chart-column",
			"searchTerms": ["bar", "bar chart", "chart", "graph", "track", "trend"]
		},
		{
			"title": "fa-solid fa-chart-gantt",
			"searchTerms": ["chart", "graph", "track", "trend"]
		},
		{
			"title": "fa-solid fa-chart-line",
			"searchTerms": ["activity", "analytics", "chart", "dashboard", "gain", "graph", "increase", "line"]
		},
		{
			"title": "fa-solid fa-chart-pie",
			"searchTerms": ["analytics", "chart", "diagram", "graph", "pie"]
		},
		{
			"title": "fa-solid fa-chart-simple",
			"searchTerms": ["analytics", "bar", "chart", "column", "graph", "row", "trend"]
		},
		{
			"title": "fa-solid fa-check",
			"searchTerms": ["Check Mark", "accept", "agree", "check", "check mark", "checkmark", "confirm", "correct", "done", "mark", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes", "✓"]
		},
		{
			"title": "fa-solid fa-check-double",
			"searchTerms": ["accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo"]
		},
		{
			"title": "fa-solid fa-check-to-slot",
			"searchTerms": ["accept", "cast", "election", "politics", "positive", "voting", "yes"]
		},
		{
			"title": "fa-solid fa-cheese",
			"searchTerms": ["cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge"]
		},
		{
			"title": "fa-solid fa-chess",
			"searchTerms": ["board", "castle", "checkmate", "game", "king", "rook", "strategy", "tournament"]
		},
		{
			"title": "fa-regular fa-chess-bishop",
			"searchTerms": ["Black Chess Bishop", "board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-bishop",
			"searchTerms": ["Black Chess Bishop", "board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-solid fa-chess-board",
			"searchTerms": ["board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-king",
			"searchTerms": ["Black Chess King", "board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-king",
			"searchTerms": ["Black Chess King", "board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-knight",
			"searchTerms": ["Black Chess Knight", "board", "checkmate", "game", "horse", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-knight",
			"searchTerms": ["Black Chess Knight", "board", "checkmate", "game", "horse", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-pawn",
			"searchTerms": ["board", "checkmate", "chess", "chess pawn", "dupe", "expendable", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-pawn",
			"searchTerms": ["board", "checkmate", "chess", "chess pawn", "dupe", "expendable", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-queen",
			"searchTerms": ["Black Chess Queen", "board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-queen",
			"searchTerms": ["Black Chess Queen", "board", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-rook",
			"searchTerms": ["Black Chess Rook", "board", "castle", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-regular fa-chess-rook",
			"searchTerms": ["Black Chess Rook", "board", "castle", "checkmate", "game", "strategy"]
		},
		{
			"title": "fa-solid fa-chevron-down",
			"searchTerms": ["arrow", "download", "expand"]
		},
		{
			"title": "fa-solid fa-chevron-left",
			"searchTerms": ["Left-Pointing Angle Bracket", "arrow", "back", "bracket", "previous"]
		},
		{
			"title": "fa-solid fa-chevron-right",
			"searchTerms": ["Right-Pointing Angle Bracket", "arrow", "bracket", "forward", "next"]
		},
		{
			"title": "fa-solid fa-chevron-up",
			"searchTerms": ["arrow", "collapse", "upload"]
		},
		{
			"title": "fa-solid fa-child",
			"searchTerms": ["boy", "girl", "kid", "toddler", "young", "youth"]
		},
		{
			"title": "fa-solid fa-child-combatant",
			"searchTerms": ["combatant"]
		},
		{
			"title": "fa-solid fa-child-dress",
			"searchTerms": ["boy", "girl", "kid", "toddler", "young", "youth"]
		},
		{
			"title": "fa-solid fa-child-reaching",
			"searchTerms": ["boy", "girl", "kid", "toddler", "young", "youth"]
		},
		{
			"title": "fa-solid fa-children",
			"searchTerms": ["boy", "child", "girl", "kid", "kids", "young", "youth"]
		},
		{
			"title": "fa-brands fa-chrome",
			"searchTerms": ["browser"]
		},
		{
			"title": "fa-brands fa-chromecast",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-church",
			"searchTerms": ["Christian", "building", "cathedral", "chapel", "church", "community", "cross", "religion"]
		},
		{
			"title": "fa-regular fa-circle",
			"searchTerms": ["Black Circle", "Black Large Circle", "black circle", "blue", "blue circle", "brown", "brown circle", "chart", "circle", "circle-thin", "diameter", "dot", "ellipse", "fill", "geometric", "green", "green circle", "notification", "orange", "orange circle", "progress", "purple", "purple circle", "red", "red circle", "round", "white circle", "yellow", "yellow circle"]
		},
		{
			"title": "fa-regular fa-circle",
			"searchTerms": ["Black Circle", "Black Large Circle", "black circle", "blue", "blue circle", "brown", "brown circle", "chart", "circle", "circle-thin", "diameter", "dot", "ellipse", "fill", "geometric", "green", "green circle", "notification", "orange", "orange circle", "progress", "purple", "purple circle", "red", "red circle", "round", "white circle", "yellow", "yellow circle"]
		},
		{
			"title": "fa-solid fa-circle-arrow-down",
			"searchTerms": ["download"]
		},
		{
			"title": "fa-solid fa-circle-arrow-left",
			"searchTerms": ["back", "previous"]
		},
		{
			"title": "fa-solid fa-circle-arrow-right",
			"searchTerms": ["forward", "next"]
		},
		{
			"title": "fa-solid fa-circle-arrow-up",
			"searchTerms": ["upload"]
		},
		{
			"title": "fa-regular fa-circle-check",
			"searchTerms": ["accept", "affected", "agree", "clear", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes"]
		},
		{
			"title": "fa-regular fa-circle-check",
			"searchTerms": ["accept", "affected", "agree", "clear", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes"]
		},
		{
			"title": "fa-solid fa-circle-chevron-down",
			"searchTerms": ["arrow", "download", "dropdown", "menu", "more"]
		},
		{
			"title": "fa-solid fa-circle-chevron-left",
			"searchTerms": ["arrow", "back", "previous"]
		},
		{
			"title": "fa-solid fa-circle-chevron-right",
			"searchTerms": ["arrow", "forward", "next"]
		},
		{
			"title": "fa-solid fa-circle-chevron-up",
			"searchTerms": ["arrow", "collapse", "upload"]
		},
		{
			"title": "fa-solid fa-circle-dollar-to-slot",
			"searchTerms": ["contribute", "generosity", "gift", "give"]
		},
		{
			"title": "fa-regular fa-circle-dot",
			"searchTerms": ["bullseye", "button", "geometric", "notification", "radio", "radio button", "target"]
		},
		{
			"title": "fa-regular fa-circle-dot",
			"searchTerms": ["bullseye", "button", "geometric", "notification", "radio", "radio button", "target"]
		},
		{
			"title": "fa-regular fa-circle-down",
			"searchTerms": ["arrow-circle-o-down", "download"]
		},
		{
			"title": "fa-regular fa-circle-down",
			"searchTerms": ["arrow-circle-o-down", "download"]
		},
		{
			"title": "fa-solid fa-circle-exclamation",
			"searchTerms": ["affect", "alert", "damage", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning"]
		},
		{
			"title": "fa-solid fa-circle-h",
			"searchTerms": ["Circled Latin Capital Letter H", "clinic", "covid-19", "emergency", "letter", "map"]
		},
		{
			"title": "fa-solid fa-circle-half-stroke",
			"searchTerms": ["Circle with Left Half Black", "adjust", "chart", "contrast", "dark", "fill", "light", "pie", "progress", "saturation"]
		},
		{
			"title": "fa-solid fa-circle-info",
			"searchTerms": ["details", "help", "information", "more", "support"]
		},
		{
			"title": "fa-regular fa-circle-left",
			"searchTerms": ["arrow-circle-o-left", "back", "previous"]
		},
		{
			"title": "fa-regular fa-circle-left",
			"searchTerms": ["arrow-circle-o-left", "back", "previous"]
		},
		{
			"title": "fa-solid fa-circle-minus",
			"searchTerms": ["delete", "hide", "negative", "remove", "shape", "trash"]
		},
		{
			"title": "fa-solid fa-circle-nodes",
			"searchTerms": ["cluster", "connect", "network"]
		},
		{
			"title": "fa-solid fa-circle-notch",
			"searchTerms": ["circle-o-notch", "diameter", "dot", "ellipse", "round", "spinner"]
		},
		{
			"title": "fa-regular fa-circle-pause",
			"searchTerms": ["hold", "wait"]
		},
		{
			"title": "fa-regular fa-circle-pause",
			"searchTerms": ["hold", "wait"]
		},
		{
			"title": "fa-regular fa-circle-play",
			"searchTerms": ["audio", "music", "playing", "sound", "start", "video"]
		},
		{
			"title": "fa-regular fa-circle-play",
			"searchTerms": ["audio", "music", "playing", "sound", "start", "video"]
		},
		{
			"title": "fa-solid fa-circle-plus",
			"searchTerms": ["add", "create", "expand", "new", "positive", "shape"]
		},
		{
			"title": "fa-regular fa-circle-question",
			"searchTerms": ["help", "information", "support", "unknown"]
		},
		{
			"title": "fa-regular fa-circle-question",
			"searchTerms": ["help", "information", "support", "unknown"]
		},
		{
			"title": "fa-solid fa-circle-radiation",
			"searchTerms": ["danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "sign", "warning"]
		},
		{
			"title": "fa-regular fa-circle-right",
			"searchTerms": ["arrow-circle-o-right", "forward", "next"]
		},
		{
			"title": "fa-regular fa-circle-right",
			"searchTerms": ["arrow-circle-o-right", "forward", "next"]
		},
		{
			"title": "fa-regular fa-circle-stop",
			"searchTerms": ["block", "box", "circle", "square"]
		},
		{
			"title": "fa-regular fa-circle-stop",
			"searchTerms": ["block", "box", "circle", "square"]
		},
		{
			"title": "fa-regular fa-circle-up",
			"searchTerms": ["arrow-circle-o-up"]
		},
		{
			"title": "fa-regular fa-circle-up",
			"searchTerms": ["arrow-circle-o-up"]
		},
		{
			"title": "fa-regular fa-circle-user",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-regular fa-circle-user",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-regular fa-circle-xmark",
			"searchTerms": ["close", "cross", "destroy", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x"]
		},
		{
			"title": "fa-regular fa-circle-xmark",
			"searchTerms": ["close", "cross", "destroy", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x"]
		},
		{
			"title": "fa-solid fa-city",
			"searchTerms": ["buildings", "busy", "city", "cityscape", "skyscrapers", "urban", "windows"]
		},
		{
			"title": "fa-solid fa-clapperboard",
			"searchTerms": ["camera", "clapper", "clapper board", "director", "film", "movie", "record"]
		},
		{
			"title": "fa-regular fa-clipboard",
			"searchTerms": ["clipboar", "clipboard", "copy", "notes", "paste", "record"]
		},
		{
			"title": "fa-regular fa-clipboard",
			"searchTerms": ["clipboar", "clipboard", "copy", "notes", "paste", "record"]
		},
		{
			"title": "fa-solid fa-clipboard-check",
			"searchTerms": ["accept", "agree", "confirm", "done", "ok", "select", "success", "tick", "todo", "yes"]
		},
		{
			"title": "fa-solid fa-clipboard-list",
			"searchTerms": ["checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul"]
		},
		{
			"title": "fa-solid fa-clipboard-question",
			"searchTerms": ["assistance", "interview", "query", "question"]
		},
		{
			"title": "fa-solid fa-clipboard-user",
			"searchTerms": ["attendance", "record", "roster", "staff"]
		},
		{
			"title": "fa-regular fa-clock",
			"searchTerms": ["00", "4", "4:00", "clock", "date", "four", "four o’clock", "hour", "late", "minute", "o'clock", "o’clock", "schedule", "ticking", "time", "timer", "timestamp", "watch"]
		},
		{
			"title": "fa-regular fa-clock",
			"searchTerms": ["00", "4", "4:00", "clock", "date", "four", "four o’clock", "hour", "late", "minute", "o'clock", "o’clock", "schedule", "ticking", "time", "timer", "timestamp", "watch"]
		},
		{
			"title": "fa-solid fa-clock-rotate-left",
			"searchTerms": ["Rewind", "clock", "reverse", "time", "time machine", "time travel"]
		},
		{
			"title": "fa-regular fa-clone",
			"searchTerms": ["arrange", "copy", "duplicate", "paste"]
		},
		{
			"title": "fa-regular fa-clone",
			"searchTerms": ["arrange", "copy", "duplicate", "paste"]
		},
		{
			"title": "fa-regular fa-closed-captioning",
			"searchTerms": ["cc", "deaf", "hearing", "subtitle", "subtitling", "text", "video"]
		},
		{
			"title": "fa-regular fa-closed-captioning",
			"searchTerms": ["cc", "deaf", "hearing", "subtitle", "subtitling", "text", "video"]
		},
		{
			"title": "fa-solid fa-cloud",
			"searchTerms": ["atmosphere", "cloud", "fog", "overcast", "save", "upload", "weather"]
		},
		{
			"title": "fa-solid fa-cloud-arrow-down",
			"searchTerms": ["download", "export", "save"]
		},
		{
			"title": "fa-solid fa-cloud-arrow-up",
			"searchTerms": ["import", "save", "upload"]
		},
		{
			"title": "fa-solid fa-cloud-bolt",
			"searchTerms": ["bolt", "cloud", "cloud with lightning", "lightning", "precipitation", "rain", "storm", "weather"]
		},
		{
			"title": "fa-solid fa-cloud-meatball",
			"searchTerms": ["FLDSMDFR", "food", "spaghetti", "storm"]
		},
		{
			"title": "fa-solid fa-cloud-moon",
			"searchTerms": ["crescent", "evening", "lunar", "night", "partly cloudy", "sky"]
		},
		{
			"title": "fa-solid fa-cloud-moon-rain",
			"searchTerms": ["crescent", "evening", "lunar", "night", "partly cloudy", "precipitation", "rain", "sky", "storm"]
		},
		{
			"title": "fa-solid fa-cloud-rain",
			"searchTerms": ["Rain", "cloud", "cloud with rain", "precipitation", "rain", "sky", "storm"]
		},
		{
			"title": "fa-solid fa-cloud-showers-heavy",
			"searchTerms": ["precipitation", "rain", "sky", "storm"]
		},
		{
			"title": "fa-solid fa-cloud-showers-water",
			"searchTerms": ["cloud", "deluge", "flood", "rain", "storm", "surge"]
		},
		{
			"title": "fa-solid fa-cloud-sun",
			"searchTerms": ["clear", "cloud", "day", "daytime", "fall", "outdoors", "overcast", "partly cloudy", "sun", "sun behind cloud"]
		},
		{
			"title": "fa-solid fa-cloud-sun-rain",
			"searchTerms": ["cloud", "day", "overcast", "precipitation", "rain", "storm", "summer", "sun", "sun behind rain cloud", "sunshower"]
		},
		{
			"title": "fa-brands fa-cloudflare",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cloudscale",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cloudsmith",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-cloudversify",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-clover",
			"searchTerms": ["4", "charm", "clover", "four", "four leaf clover", "four-leaf clover", "leaf", "leprechaun", "luck", "lucky"]
		},
		{
			"title": "fa-brands fa-cmplid",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-code",
			"searchTerms": ["brackets", "code", "development", "html"]
		},
		{
			"title": "fa-solid fa-code-branch",
			"searchTerms": ["branch", "git", "github", "rebase", "svn", "vcs", "version"]
		},
		{
			"title": "fa-solid fa-code-commit",
			"searchTerms": ["commit", "git", "github", "hash", "rebase", "svn", "vcs", "version"]
		},
		{
			"title": "fa-solid fa-code-compare",
			"searchTerms": ["compare", "git", "github", "svn", "version"]
		},
		{
			"title": "fa-solid fa-code-fork",
			"searchTerms": ["fork", "git", "github", "svn", "version"]
		},
		{
			"title": "fa-solid fa-code-merge",
			"searchTerms": ["git", "github", "merge", "pr", "rebase", "svn", "vcs", "version"]
		},
		{
			"title": "fa-solid fa-code-pull-request",
			"searchTerms": ["git", "github", "pr", "svn", "version"]
		},
		{
			"title": "fa-brands fa-codepen",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-codiepie",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-coins",
			"searchTerms": ["currency", "dime", "financial", "gold", "money", "penny"]
		},
		{
			"title": "fa-solid fa-colon-sign",
			"searchTerms": ["Colon Sign", "currency"]
		},
		{
			"title": "fa-regular fa-comment",
			"searchTerms": ["Right Speech Bubble", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
		},
		{
			"title": "fa-regular fa-comment",
			"searchTerms": ["Right Speech Bubble", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
		},
		{
			"title": "fa-solid fa-comment-dollar",
			"searchTerms": ["bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer"]
		},
		{
			"title": "fa-regular fa-comment-dots",
			"searchTerms": ["balloon", "bubble", "chat", "comic", "commenting", "conversation", "dialog", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "speech balloon", "texting"]
		},
		{
			"title": "fa-regular fa-comment-dots",
			"searchTerms": ["balloon", "bubble", "chat", "comic", "commenting", "conversation", "dialog", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "speech balloon", "texting"]
		},
		{
			"title": "fa-solid fa-comment-medical",
			"searchTerms": ["advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting"]
		},
		{
			"title": "fa-solid fa-comment-slash",
			"searchTerms": ["bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting"]
		},
		{
			"title": "fa-solid fa-comment-sms",
			"searchTerms": ["chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting"]
		},
		{
			"title": "fa-regular fa-comments",
			"searchTerms": ["Two Speech Bubbles", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
		},
		{
			"title": "fa-regular fa-comments",
			"searchTerms": ["Two Speech Bubbles", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
		},
		{
			"title": "fa-solid fa-comments-dollar",
			"searchTerms": ["bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer"]
		},
		{
			"title": "fa-solid fa-compact-disc",
			"searchTerms": ["Optical Disc Icon", "album", "blu-ray", "bluray", "cd", "computer", "disc", "disk", "dvd", "media", "movie", "music", "optical", "optical disk", "record", "video", "vinyl"]
		},
		{
			"title": "fa-regular fa-compass",
			"searchTerms": ["compass", "directions", "directory", "location", "magnetic", "menu", "navigation", "orienteering", "safari", "travel"]
		},
		{
			"title": "fa-regular fa-compass",
			"searchTerms": ["compass", "directions", "directory", "location", "magnetic", "menu", "navigation", "orienteering", "safari", "travel"]
		},
		{
			"title": "fa-solid fa-compass-drafting",
			"searchTerms": ["design", "map", "mechanical drawing", "plot", "plotting"]
		},
		{
			"title": "fa-solid fa-compress",
			"searchTerms": ["collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller"]
		},
		{
			"title": "fa-solid fa-computer",
			"searchTerms": ["computer", "desktop", "display", "monitor", "tower"]
		},
		{
			"title": "fa-solid fa-computer-mouse",
			"searchTerms": ["click", "computer", "computer mouse", "cursor", "input", "peripheral"]
		},
		{
			"title": "fa-brands fa-confluence",
			"searchTerms": ["atlassian"]
		},
		{
			"title": "fa-brands fa-connectdevelop",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-contao",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-cookie",
			"searchTerms": ["baked good", "chips", "chocolate", "cookie", "dessert", "eat", "snack", "sweet", "treat"]
		},
		{
			"title": "fa-solid fa-cookie-bite",
			"searchTerms": ["baked good", "bitten", "chips", "chocolate", "eat", "snack", "sweet", "treat"]
		},
		{
			"title": "fa-regular fa-copy",
			"searchTerms": ["clone", "duplicate", "file", "files-o", "paper", "paste"]
		},
		{
			"title": "fa-regular fa-copy",
			"searchTerms": ["clone", "duplicate", "file", "files-o", "paper", "paste"]
		},
		{
			"title": "fa-regular fa-copyright",
			"searchTerms": ["brand", "c", "copyright", "mark", "register", "trademark"]
		},
		{
			"title": "fa-regular fa-copyright",
			"searchTerms": ["brand", "c", "copyright", "mark", "register", "trademark"]
		},
		{
			"title": "fa-brands fa-cotton-bureau",
			"searchTerms": ["clothing", "t-shirts", "tshirts"]
		},
		{
			"title": "fa-solid fa-couch",
			"searchTerms": ["chair", "cushion", "furniture", "relax", "sofa"]
		},
		{
			"title": "fa-solid fa-cow",
			"searchTerms": ["agriculture", "animal", "beef", "bovine", "co", "cow", "farm", "fauna", "livestock", "mammal", "milk", "moo"]
		},
		{
			"title": "fa-brands fa-cpanel",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-by",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-nc",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-nc-eu",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-nc-jp",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-nd",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-pd",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-pd-alt",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-remix",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-sa",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-sampling",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-sampling-plus",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-share",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-creative-commons-zero",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-credit-card",
			"searchTerms": ["buy", "card", "checkout", "credit", "credit card", "credit-card-alt", "debit", "money", "payment", "purchase"]
		},
		{
			"title": "fa-regular fa-credit-card",
			"searchTerms": ["buy", "card", "checkout", "credit", "credit card", "credit-card-alt", "debit", "money", "payment", "purchase"]
		},
		{
			"title": "fa-brands fa-critical-role",
			"searchTerms": ["Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop"]
		},
		{
			"title": "fa-solid fa-crop",
			"searchTerms": ["design", "frame", "mask", "resize", "shrink"]
		},
		{
			"title": "fa-solid fa-crop-simple",
			"searchTerms": ["design", "frame", "mask", "resize", "shrink"]
		},
		{
			"title": "fa-solid fa-cross",
			"searchTerms": ["Christian", "Heavy Latin Cross", "catholicism", "christianity", "church", "cross", "jesus", "latin cross", "religion"]
		},
		{
			"title": "fa-solid fa-crosshairs",
			"searchTerms": ["aim", "bullseye", "gpd", "picker", "position"]
		},
		{
			"title": "fa-solid fa-crow",
			"searchTerms": ["bird", "bullfrog", "fauna", "halloween", "holiday", "toad"]
		},
		{
			"title": "fa-solid fa-crown",
			"searchTerms": ["award", "clothing", "crown", "favorite", "king", "queen", "royal", "tiara"]
		},
		{
			"title": "fa-solid fa-crutch",
			"searchTerms": ["cane", "injury", "mobility", "wheelchair"]
		},
		{
			"title": "fa-solid fa-cruzeiro-sign",
			"searchTerms": ["Cruzeiro Sign", "currency"]
		},
		{
			"title": "fa-brands fa-css3",
			"searchTerms": ["code"]
		},
		{
			"title": "fa-brands fa-css3-alt",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-cube",
			"searchTerms": ["3d", "block", "dice", "package", "square", "tesseract"]
		},
		{
			"title": "fa-solid fa-cubes",
			"searchTerms": ["3d", "block", "dice", "package", "pyramid", "square", "stack", "tesseract"]
		},
		{
			"title": "fa-solid fa-cubes-stacked",
			"searchTerms": ["blocks", "cubes", "sugar"]
		},
		{
			"title": "fa-brands fa-cuttlefish",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-d",
			"searchTerms": ["Latin Capital Letter D", "Latin Small Letter D", "letter"]
		},
		{
			"title": "fa-brands fa-d-and-d",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-d-and-d-beyond",
			"searchTerms": ["Dungeons & Dragons", "d&d", "dnd", "fantasy", "gaming", "tabletop"]
		},
		{
			"title": "fa-brands fa-dailymotion",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-dashcube",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-database",
			"searchTerms": ["computer", "development", "directory", "memory", "storage"]
		},
		{
			"title": "fa-brands fa-debian",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-deezer",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-delete-left",
			"searchTerms": ["Erase to the Left", "command", "delete", "erase", "keyboard", "undo"]
		},
		{
			"title": "fa-brands fa-delicious",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-democrat",
			"searchTerms": ["american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa"]
		},
		{
			"title": "fa-brands fa-deploydog",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-deskpro",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-desktop",
			"searchTerms": ["computer", "cpu", "demo", "desktop", "desktop computer", "device", "imac", "machine", "monitor", "pc", "screen"]
		},
		{
			"title": "fa-brands fa-dev",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-deviantart",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-dharmachakra",
			"searchTerms": ["Buddhist", "buddhism", "buddhist", "dharma", "religion", "wheel", "wheel of dharma"]
		},
		{
			"title": "fa-brands fa-dhl",
			"searchTerms": ["Dalsey", "Hillblom and Lynn", "german", "package", "shipping"]
		},
		{
			"title": "fa-solid fa-diagram-next",
			"searchTerms": ["cells", "chart", "gantt", "row", "subtask", "successor", "table"]
		},
		{
			"title": "fa-solid fa-diagram-predecessor",
			"searchTerms": ["cells", "chart", "gantt", "predecessor", "previous", "row", "subtask", "table"]
		},
		{
			"title": "fa-solid fa-diagram-project",
			"searchTerms": ["chart", "graph", "network", "pert"]
		},
		{
			"title": "fa-solid fa-diagram-successor",
			"searchTerms": ["cells", "chart", "gantt", "next", "row", "subtask", "successor", "table"]
		},
		{
			"title": "fa-solid fa-diamond",
			"searchTerms": ["card", "cards", "diamond suit", "game", "gem", "gemstone", "poker", "suit"]
		},
		{
			"title": "fa-solid fa-diamond-turn-right",
			"searchTerms": ["map", "navigation", "sign", "turn"]
		},
		{
			"title": "fa-brands fa-diaspora",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-dice",
			"searchTerms": ["chance", "dice", "die", "gambling", "game", "game die", "roll"]
		},
		{
			"title": "fa-solid fa-dice-d20",
			"searchTerms": ["Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-d6",
			"searchTerms": ["Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-five",
			"searchTerms": ["Die Face-5", "chance", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-four",
			"searchTerms": ["Die Face-4", "chance", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-one",
			"searchTerms": ["Die Face-1", "chance", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-six",
			"searchTerms": ["Die Face-6", "chance", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-three",
			"searchTerms": ["Die Face-3", "chance", "gambling", "game", "roll"]
		},
		{
			"title": "fa-solid fa-dice-two",
			"searchTerms": ["Die Face-2", "chance", "gambling", "game", "roll"]
		},
		{
			"title": "fa-brands fa-digg",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-digital-ocean",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-discord",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-discourse",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-disease",
			"searchTerms": ["bacteria", "cancer", "coronavirus", "covid-19", "flu", "illness", "infection", "pandemic", "sickness", "virus"]
		},
		{
			"title": "fa-solid fa-display",
			"searchTerms": ["Screen", "computer", "desktop", "imac"]
		},
		{
			"title": "fa-solid fa-divide",
			"searchTerms": ["Division Sign", "arithmetic", "calculus", "divide", "division", "math", "sign", "÷"]
		},
		{
			"title": "fa-solid fa-dna",
			"searchTerms": ["biologist", "dna", "double helix", "evolution", "gene", "genetic", "genetics", "helix", "life", "molecule", "protein"]
		},
		{
			"title": "fa-brands fa-dochub",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-docker",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-dog",
			"searchTerms": ["animal", "canine", "dog", "fauna", "mammal", "pet", "pooch", "puppy", "woof"]
		},
		{
			"title": "fa-solid fa-dollar-sign",
			"searchTerms": ["Dollar Sign", "currency", "dollar", "heavy dollar sign", "money"]
		},
		{
			"title": "fa-solid fa-dolly",
			"searchTerms": ["carry", "shipping", "transport"]
		},
		{
			"title": "fa-solid fa-dong-sign",
			"searchTerms": ["Dong Sign", "currency"]
		},
		{
			"title": "fa-solid fa-door-closed",
			"searchTerms": ["doo", "door", "enter", "exit", "locked"]
		},
		{
			"title": "fa-solid fa-door-open",
			"searchTerms": ["enter", "exit", "welcome"]
		},
		{
			"title": "fa-solid fa-dove",
			"searchTerms": ["bird", "dove", "fauna", "fly", "flying", "peace", "war"]
		},
		{
			"title": "fa-solid fa-down-left-and-up-right-to-center",
			"searchTerms": ["collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller"]
		},
		{
			"title": "fa-solid fa-down-long",
			"searchTerms": ["download", "long-arrow-down"]
		},
		{
			"title": "fa-solid fa-download",
			"searchTerms": ["export", "hard drive", "save", "transfer"]
		},
		{
			"title": "fa-brands fa-draft2digital",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-dragon",
			"searchTerms": ["Dungeons & Dragons", "d&d", "dnd", "dragon", "fairy tale", "fantasy", "fire", "lizard", "serpent"]
		},
		{
			"title": "fa-solid fa-draw-polygon",
			"searchTerms": ["anchors", "lines", "object", "render", "shape"]
		},
		{
			"title": "fa-brands fa-dribbble",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-dropbox",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-droplet",
			"searchTerms": ["cold", "color", "comic", "drop", "droplet", "raindrop", "sweat", "waterdrop"]
		},
		{
			"title": "fa-solid fa-droplet-slash",
			"searchTerms": ["color", "drop", "droplet", "raindrop", "waterdrop"]
		},
		{
			"title": "fa-solid fa-drum",
			"searchTerms": ["drum", "drumsticks", "instrument", "music", "percussion", "snare", "sound"]
		},
		{
			"title": "fa-solid fa-drum-steelpan",
			"searchTerms": ["calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical"]
		},
		{
			"title": "fa-solid fa-drumstick-bite",
			"searchTerms": ["bone", "chicken", "leg", "meat", "poultry", "turkey"]
		},
		{
			"title": "fa-brands fa-drupal",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-dumbbell",
			"searchTerms": ["exercise", "gym", "strength", "weight", "weight-lifting"]
		},
		{
			"title": "fa-solid fa-dumpster",
			"searchTerms": ["alley", "bin", "commercial", "trash", "waste"]
		},
		{
			"title": "fa-solid fa-dumpster-fire",
			"searchTerms": ["alley", "bin", "commercial", "danger", "dangerous", "euphemism", "flame", "heat", "hot", "trash", "waste"]
		},
		{
			"title": "fa-solid fa-dungeon",
			"searchTerms": ["Dungeons & Dragons", "building", "d&d", "dnd", "door", "entrance", "fantasy", "gate"]
		},
		{
			"title": "fa-brands fa-dyalog",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-e",
			"searchTerms": ["Latin Capital Letter E", "Latin Small Letter E", "letter"]
		},
		{
			"title": "fa-solid fa-ear-deaf",
			"searchTerms": ["ear", "hearing", "sign language"]
		},
		{
			"title": "fa-solid fa-ear-listen",
			"searchTerms": ["amplify", "audio", "deaf", "ear", "headset", "hearing", "sound"]
		},
		{
			"title": "fa-brands fa-earlybirds",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-earth-africa",
			"searchTerms": ["africa", "all", "country", "earth", "europe", "global", "globe", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world"]
		},
		{
			"title": "fa-solid fa-earth-americas",
			"searchTerms": ["all", "america", "country", "earth", "global", "globe", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world"]
		},
		{
			"title": "fa-solid fa-earth-asia",
			"searchTerms": ["all", "asia", "australia", "country", "earth", "global", "globe", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world"]
		},
		{
			"title": "fa-solid fa-earth-europe",
			"searchTerms": ["all", "country", "earth", "europe", "global", "globe", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world"]
		},
		{
			"title": "fa-solid fa-earth-oceania",
			"searchTerms": ["all", "australia", "country", "earth", "global", "globe", "gps", "language", "localize", "location", "map", "melanesia", "micronesia", "new zealand", "online", "place", "planet", "polynesia", "translate", "travel", "world"]
		},
		{
			"title": "fa-brands fa-ebay",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-edge",
			"searchTerms": ["browser", "ie"]
		},
		{
			"title": "fa-brands fa-edge-legacy",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-egg",
			"searchTerms": ["breakfast", "chicken", "easter", "egg", "food", "shell", "yolk"]
		},
		{
			"title": "fa-solid fa-eject",
			"searchTerms": ["abort", "cancel", "cd", "discharge", "eject", "eject button"]
		},
		{
			"title": "fa-brands fa-elementor",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-elevator",
			"searchTerms": ["accessibility", "elevator", "hoist", "lift", "users-people"]
		},
		{
			"title": "fa-solid fa-ellipsis",
			"searchTerms": ["dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "pacman", "reorder", "settings", "ul"]
		},
		{
			"title": "fa-solid fa-ellipsis-vertical",
			"searchTerms": ["dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul"]
		},
		{
			"title": "fa-brands fa-ello",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-ember",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-empire",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-envelope",
			"searchTerms": ["Back of Envelope", "e-mail", "email", "envelope", "letter", "mail", "message", "notification", "support"]
		},
		{
			"title": "fa-regular fa-envelope",
			"searchTerms": ["Back of Envelope", "e-mail", "email", "envelope", "letter", "mail", "message", "notification", "support"]
		},
		{
			"title": "fa-solid fa-envelope-circle-check",
			"searchTerms": ["check", "email", "envelope", "mail", "not affected", "ok", "okay", "read", "sent"]
		},
		{
			"title": "fa-regular fa-envelope-open",
			"searchTerms": ["e-mail", "email", "letter", "mail", "message", "notification", "support"]
		},
		{
			"title": "fa-regular fa-envelope-open",
			"searchTerms": ["e-mail", "email", "letter", "mail", "message", "notification", "support"]
		},
		{
			"title": "fa-solid fa-envelope-open-text",
			"searchTerms": ["e-mail", "email", "letter", "mail", "message", "notification", "support"]
		},
		{
			"title": "fa-solid fa-envelopes-bulk",
			"searchTerms": ["archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps"]
		},
		{
			"title": "fa-brands fa-envira",
			"searchTerms": ["leaf"]
		},
		{
			"title": "fa-solid fa-equals",
			"searchTerms": ["Equals Sign", "arithmetic", "even", "match", "math"]
		},
		{
			"title": "fa-solid fa-eraser",
			"searchTerms": ["art", "delete", "remove", "rubber"]
		},
		{
			"title": "fa-brands fa-erlang",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-ethereum",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-ethernet",
			"searchTerms": ["cable", "cat 5", "cat 6", "connection", "hardware", "internet", "network", "wired"]
		},
		{
			"title": "fa-brands fa-etsy",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-euro-sign",
			"searchTerms": ["Euro Sign", "currency"]
		},
		{
			"title": "fa-brands fa-evernote",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-exclamation",
			"searchTerms": ["!", "Exclamation Mark", "alert", "danger", "error", "exclamation", "important", "mark", "notice", "notification", "notify", "outlined", "problem", "punctuation", "red exclamation mark", "warning", "white exclamation mark"]
		},
		{
			"title": "fa-solid fa-expand",
			"searchTerms": ["bigger", "crop", "enlarge", "focus", "fullscreen", "resize", "viewfinder"]
		},
		{
			"title": "fa-brands fa-expeditedssl",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-explosion",
			"searchTerms": ["blast", "blowup", "boom", "crash", "detonation", "explosion"]
		},
		{
			"title": "fa-regular fa-eye",
			"searchTerms": ["body", "eye", "look", "optic", "see", "seen", "show", "sight", "views", "visible"]
		},
		{
			"title": "fa-regular fa-eye",
			"searchTerms": ["body", "eye", "look", "optic", "see", "seen", "show", "sight", "views", "visible"]
		},
		{
			"title": "fa-solid fa-eye-dropper",
			"searchTerms": ["beaker", "clone", "color", "copy", "eyedropper", "pipette"]
		},
		{
			"title": "fa-solid fa-eye-low-vision",
			"searchTerms": ["blind", "eye", "sight"]
		},
		{
			"title": "fa-regular fa-eye-slash",
			"searchTerms": ["blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity"]
		},
		{
			"title": "fa-regular fa-eye-slash",
			"searchTerms": ["blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity"]
		},
		{
			"title": "fa-solid fa-f",
			"searchTerms": ["Latin Capital Letter F", "Latin Small Letter F", "letter"]
		},
		{
			"title": "fa-regular fa-face-angry",
			"searchTerms": ["angry", "angry face", "disapprove", "emoticon", "face", "mad", "upset"]
		},
		{
			"title": "fa-regular fa-face-angry",
			"searchTerms": ["angry", "angry face", "disapprove", "emoticon", "face", "mad", "upset"]
		},
		{
			"title": "fa-regular fa-face-dizzy",
			"searchTerms": ["dazed", "dead", "disapprove", "emoticon", "face"]
		},
		{
			"title": "fa-regular fa-face-dizzy",
			"searchTerms": ["dazed", "dead", "disapprove", "emoticon", "face"]
		},
		{
			"title": "fa-regular fa-face-flushed",
			"searchTerms": ["dazed", "embarrassed", "emoticon", "face", "flushed", "flushed face"]
		},
		{
			"title": "fa-regular fa-face-flushed",
			"searchTerms": ["dazed", "embarrassed", "emoticon", "face", "flushed", "flushed face"]
		},
		{
			"title": "fa-regular fa-face-frown",
			"searchTerms": ["disapprove", "emoticon", "face", "frown", "frowning face", "rating", "sad"]
		},
		{
			"title": "fa-regular fa-face-frown",
			"searchTerms": ["disapprove", "emoticon", "face", "frown", "frowning face", "rating", "sad"]
		},
		{
			"title": "fa-regular fa-face-frown-open",
			"searchTerms": ["disapprove", "emoticon", "face", "frown", "frowning face with open mouth", "mouth", "open", "rating", "sad"]
		},
		{
			"title": "fa-regular fa-face-frown-open",
			"searchTerms": ["disapprove", "emoticon", "face", "frown", "frowning face with open mouth", "mouth", "open", "rating", "sad"]
		},
		{
			"title": "fa-regular fa-face-grimace",
			"searchTerms": ["cringe", "emoticon", "face", "grimace", "grimacing face", "teeth"]
		},
		{
			"title": "fa-regular fa-face-grimace",
			"searchTerms": ["cringe", "emoticon", "face", "grimace", "grimacing face", "teeth"]
		},
		{
			"title": "fa-regular fa-face-grin",
			"searchTerms": ["emoticon", "face", "grin", "grinning face", "laugh", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin",
			"searchTerms": ["emoticon", "face", "grin", "grinning face", "laugh", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-beam",
			"searchTerms": ["emoticon", "eye", "face", "grinning face with smiling eyes", "laugh", "mouth", "open", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-beam",
			"searchTerms": ["emoticon", "eye", "face", "grinning face with smiling eyes", "laugh", "mouth", "open", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-beam-sweat",
			"searchTerms": ["cold", "embarass", "emoticon", "face", "grinning face with sweat", "open", "smile", "sweat"]
		},
		{
			"title": "fa-regular fa-face-grin-beam-sweat",
			"searchTerms": ["cold", "embarass", "emoticon", "face", "grinning face with sweat", "open", "smile", "sweat"]
		},
		{
			"title": "fa-regular fa-face-grin-hearts",
			"searchTerms": ["emoticon", "eye", "face", "love", "smile", "smiling face with heart-eyes"]
		},
		{
			"title": "fa-regular fa-face-grin-hearts",
			"searchTerms": ["emoticon", "eye", "face", "love", "smile", "smiling face with heart-eyes"]
		},
		{
			"title": "fa-regular fa-face-grin-squint",
			"searchTerms": ["emoticon", "face", "grinning squinting face", "laugh", "mouth", "satisfied", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-squint",
			"searchTerms": ["emoticon", "face", "grinning squinting face", "laugh", "mouth", "satisfied", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-squint-tears",
			"searchTerms": ["emoticon", "face", "floor", "happy", "laugh", "rolling", "rolling on the floor laughing", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-squint-tears",
			"searchTerms": ["emoticon", "face", "floor", "happy", "laugh", "rolling", "rolling on the floor laughing", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-stars",
			"searchTerms": ["emoticon", "eyes", "face", "grinning", "star", "star-struck", "starry-eyed"]
		},
		{
			"title": "fa-regular fa-face-grin-stars",
			"searchTerms": ["emoticon", "eyes", "face", "grinning", "star", "star-struck", "starry-eyed"]
		},
		{
			"title": "fa-regular fa-face-grin-tears",
			"searchTerms": ["LOL", "emoticon", "face", "face with tears of joy", "joy", "laugh", "tear"]
		},
		{
			"title": "fa-regular fa-face-grin-tears",
			"searchTerms": ["LOL", "emoticon", "face", "face with tears of joy", "joy", "laugh", "tear"]
		},
		{
			"title": "fa-regular fa-face-grin-tongue",
			"searchTerms": ["LOL", "emoticon", "face", "face with tongue", "tongue"]
		},
		{
			"title": "fa-regular fa-face-grin-tongue",
			"searchTerms": ["LOL", "emoticon", "face", "face with tongue", "tongue"]
		},
		{
			"title": "fa-regular fa-face-grin-tongue-squint",
			"searchTerms": ["LOL", "emoticon", "eye", "face", "horrible", "squinting face with tongue", "taste", "tongue"]
		},
		{
			"title": "fa-regular fa-face-grin-tongue-squint",
			"searchTerms": ["LOL", "emoticon", "eye", "face", "horrible", "squinting face with tongue", "taste", "tongue"]
		},
		{
			"title": "fa-regular fa-face-grin-tongue-wink",
			"searchTerms": ["LOL", "emoticon", "eye", "face", "joke", "tongue", "wink", "winking face with tongue"]
		},
		{
			"title": "fa-regular fa-face-grin-tongue-wink",
			"searchTerms": ["LOL", "emoticon", "eye", "face", "joke", "tongue", "wink", "winking face with tongue"]
		},
		{
			"title": "fa-regular fa-face-grin-wide",
			"searchTerms": ["emoticon", "face", "grinning face with big eyes", "laugh", "mouth", "open", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-wide",
			"searchTerms": ["emoticon", "face", "grinning face with big eyes", "laugh", "mouth", "open", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-wink",
			"searchTerms": ["emoticon", "face", "flirt", "laugh", "smile"]
		},
		{
			"title": "fa-regular fa-face-grin-wink",
			"searchTerms": ["emoticon", "face", "flirt", "laugh", "smile"]
		},
		{
			"title": "fa-regular fa-face-kiss",
			"searchTerms": ["beso", "emoticon", "face", "kiss", "kissing face", "love", "smooch"]
		},
		{
			"title": "fa-regular fa-face-kiss",
			"searchTerms": ["beso", "emoticon", "face", "kiss", "kissing face", "love", "smooch"]
		},
		{
			"title": "fa-regular fa-face-kiss-beam",
			"searchTerms": ["beso", "emoticon", "eye", "face", "kiss", "kissing face with smiling eyes", "love", "smile", "smooch"]
		},
		{
			"title": "fa-regular fa-face-kiss-beam",
			"searchTerms": ["beso", "emoticon", "eye", "face", "kiss", "kissing face with smiling eyes", "love", "smile", "smooch"]
		},
		{
			"title": "fa-regular fa-face-kiss-wink-heart",
			"searchTerms": ["beso", "emoticon", "face", "face blowing a kiss", "kiss", "love", "smooch"]
		},
		{
			"title": "fa-regular fa-face-kiss-wink-heart",
			"searchTerms": ["beso", "emoticon", "face", "face blowing a kiss", "kiss", "love", "smooch"]
		},
		{
			"title": "fa-regular fa-face-laugh",
			"searchTerms": ["LOL", "emoticon", "face", "laugh", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh",
			"searchTerms": ["LOL", "emoticon", "face", "laugh", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh-beam",
			"searchTerms": ["LOL", "beaming face with smiling eyes", "emoticon", "eye", "face", "grin", "happy", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh-beam",
			"searchTerms": ["LOL", "beaming face with smiling eyes", "emoticon", "eye", "face", "grin", "happy", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh-squint",
			"searchTerms": ["LOL", "emoticon", "face", "happy", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh-squint",
			"searchTerms": ["LOL", "emoticon", "face", "happy", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh-wink",
			"searchTerms": ["LOL", "emoticon", "face", "happy", "smile"]
		},
		{
			"title": "fa-regular fa-face-laugh-wink",
			"searchTerms": ["LOL", "emoticon", "face", "happy", "smile"]
		},
		{
			"title": "fa-regular fa-face-meh",
			"searchTerms": ["deadpan", "emoticon", "face", "meh", "neutral", "neutral face", "rating"]
		},
		{
			"title": "fa-regular fa-face-meh",
			"searchTerms": ["deadpan", "emoticon", "face", "meh", "neutral", "neutral face", "rating"]
		},
		{
			"title": "fa-regular fa-face-meh-blank",
			"searchTerms": ["emoticon", "face", "face without mouth", "mouth", "neutral", "quiet", "rating", "silent"]
		},
		{
			"title": "fa-regular fa-face-meh-blank",
			"searchTerms": ["emoticon", "face", "face without mouth", "mouth", "neutral", "quiet", "rating", "silent"]
		},
		{
			"title": "fa-regular fa-face-rolling-eyes",
			"searchTerms": ["emoticon", "eyeroll", "eyes", "face", "face with rolling eyes", "neutral", "rating", "rolling"]
		},
		{
			"title": "fa-regular fa-face-rolling-eyes",
			"searchTerms": ["emoticon", "eyeroll", "eyes", "face", "face with rolling eyes", "neutral", "rating", "rolling"]
		},
		{
			"title": "fa-regular fa-face-sad-cry",
			"searchTerms": ["cry", "emoticon", "face", "loudly crying face", "sad", "sob", "tear", "tears"]
		},
		{
			"title": "fa-regular fa-face-sad-cry",
			"searchTerms": ["cry", "emoticon", "face", "loudly crying face", "sad", "sob", "tear", "tears"]
		},
		{
			"title": "fa-regular fa-face-sad-tear",
			"searchTerms": ["cry", "crying face", "emoticon", "face", "sad", "tear", "tears"]
		},
		{
			"title": "fa-regular fa-face-sad-tear",
			"searchTerms": ["cry", "crying face", "emoticon", "face", "sad", "tear", "tears"]
		},
		{
			"title": "fa-regular fa-face-smile",
			"searchTerms": ["approve", "emoticon", "face", "happy", "rating", "satisfied", "slightly smiling face", "smile"]
		},
		{
			"title": "fa-regular fa-face-smile",
			"searchTerms": ["approve", "emoticon", "face", "happy", "rating", "satisfied", "slightly smiling face", "smile"]
		},
		{
			"title": "fa-regular fa-face-smile-beam",
			"searchTerms": ["blush", "emoticon", "eye", "face", "happy", "positive", "smile", "smiling face with smiling eyes"]
		},
		{
			"title": "fa-regular fa-face-smile-beam",
			"searchTerms": ["blush", "emoticon", "eye", "face", "happy", "positive", "smile", "smiling face with smiling eyes"]
		},
		{
			"title": "fa-regular fa-face-smile-wink",
			"searchTerms": ["emoticon", "face", "happy", "hint", "joke", "wink", "winking face"]
		},
		{
			"title": "fa-regular fa-face-smile-wink",
			"searchTerms": ["emoticon", "face", "happy", "hint", "joke", "wink", "winking face"]
		},
		{
			"title": "fa-regular fa-face-surprise",
			"searchTerms": ["emoticon", "face", "face with open mouth", "mouth", "open", "shocked", "sympathy"]
		},
		{
			"title": "fa-regular fa-face-surprise",
			"searchTerms": ["emoticon", "face", "face with open mouth", "mouth", "open", "shocked", "sympathy"]
		},
		{
			"title": "fa-regular fa-face-tired",
			"searchTerms": ["angry", "emoticon", "face", "grumpy", "tired", "tired face", "upset"]
		},
		{
			"title": "fa-regular fa-face-tired",
			"searchTerms": ["angry", "emoticon", "face", "grumpy", "tired", "tired face", "upset"]
		},
		{
			"title": "fa-brands fa-facebook",
			"searchTerms": ["facebook-official", "social network"]
		},
		{
			"title": "fa-brands fa-facebook-f",
			"searchTerms": ["facebook"]
		},
		{
			"title": "fa-brands fa-facebook-messenger",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-fan",
			"searchTerms": ["ac", "air conditioning", "blade", "blower", "cool", "hot"]
		},
		{
			"title": "fa-brands fa-fantasy-flight-games",
			"searchTerms": ["Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop"]
		},
		{
			"title": "fa-solid fa-faucet",
			"searchTerms": ["covid-19", "drinking", "drip", "house", "hygiene", "kitchen", "potable", "potable water", "sanitation", "sink", "water"]
		},
		{
			"title": "fa-solid fa-faucet-drip",
			"searchTerms": ["drinking", "drip", "house", "hygiene", "kitchen", "potable", "potable water", "sanitation", "sink", "water"]
		},
		{
			"title": "fa-solid fa-fax",
			"searchTerms": ["Fax Icon", "business", "communicate", "copy", "facsimile", "fax", "fax machine", "send"]
		},
		{
			"title": "fa-solid fa-feather",
			"searchTerms": ["bird", "feather", "flight", "light", "plucked", "plumage", "quill", "write"]
		},
		{
			"title": "fa-solid fa-feather-pointed",
			"searchTerms": ["bird", "light", "plucked", "quill", "write"]
		},
		{
			"title": "fa-brands fa-fedex",
			"searchTerms": ["Federal Express", "package", "shipping"]
		},
		{
			"title": "fa-brands fa-fedora",
			"searchTerms": ["linux", "operating system", "os"]
		},
		{
			"title": "fa-solid fa-ferry",
			"searchTerms": ["barge", "boat", "carry", "ferryboat", "ship"]
		},
		{
			"title": "fa-brands fa-figma",
			"searchTerms": ["app", "design", "interface"]
		},
		{
			"title": "fa-regular fa-file",
			"searchTerms": ["Empty Document", "document", "new", "page", "page facing up", "pdf", "resume"]
		},
		{
			"title": "fa-regular fa-file",
			"searchTerms": ["Empty Document", "document", "new", "page", "page facing up", "pdf", "resume"]
		},
		{
			"title": "fa-solid fa-file-arrow-down",
			"searchTerms": ["document", "export", "save"]
		},
		{
			"title": "fa-solid fa-file-arrow-up",
			"searchTerms": ["document", "import", "page", "save"]
		},
		{
			"title": "fa-regular fa-file-audio",
			"searchTerms": ["document", "mp3", "music", "page", "play", "sound"]
		},
		{
			"title": "fa-regular fa-file-audio",
			"searchTerms": ["document", "mp3", "music", "page", "play", "sound"]
		},
		{
			"title": "fa-solid fa-file-circle-check",
			"searchTerms": ["document", "file", "not affected", "ok", "okay", "paper"]
		},
		{
			"title": "fa-solid fa-file-circle-exclamation",
			"searchTerms": ["document", "file", "paper"]
		},
		{
			"title": "fa-solid fa-file-circle-minus",
			"searchTerms": ["document", "file", "paper"]
		},
		{
			"title": "fa-solid fa-file-circle-plus",
			"searchTerms": ["add", "document", "file", "new", "page", "paper", "pdf"]
		},
		{
			"title": "fa-solid fa-file-circle-question",
			"searchTerms": ["document", "file", "paper"]
		},
		{
			"title": "fa-solid fa-file-circle-xmark",
			"searchTerms": ["document", "file", "paper"]
		},
		{
			"title": "fa-regular fa-file-code",
			"searchTerms": ["css", "development", "document", "html"]
		},
		{
			"title": "fa-regular fa-file-code",
			"searchTerms": ["css", "development", "document", "html"]
		},
		{
			"title": "fa-solid fa-file-contract",
			"searchTerms": ["agreement", "binding", "document", "legal", "signature"]
		},
		{
			"title": "fa-solid fa-file-csv",
			"searchTerms": ["document", "excel", "numbers", "spreadsheets", "table"]
		},
		{
			"title": "fa-regular fa-file-excel",
			"searchTerms": ["csv", "document", "numbers", "spreadsheets", "table"]
		},
		{
			"title": "fa-regular fa-file-excel",
			"searchTerms": ["csv", "document", "numbers", "spreadsheets", "table"]
		},
		{
			"title": "fa-solid fa-file-export",
			"searchTerms": ["download", "save"]
		},
		{
			"title": "fa-regular fa-file-image",
			"searchTerms": ["Document with Picture", "document", "image", "jpg", "photo", "png"]
		},
		{
			"title": "fa-regular fa-file-image",
			"searchTerms": ["Document with Picture", "document", "image", "jpg", "photo", "png"]
		},
		{
			"title": "fa-solid fa-file-import",
			"searchTerms": ["copy", "document", "send", "upload"]
		},
		{
			"title": "fa-solid fa-file-invoice",
			"searchTerms": ["account", "bill", "charge", "document", "payment", "receipt"]
		},
		{
			"title": "fa-solid fa-file-invoice-dollar",
			"searchTerms": ["$", "account", "bill", "charge", "document", "dollar-sign", "money", "payment", "receipt", "usd"]
		},
		{
			"title": "fa-regular fa-file-lines",
			"searchTerms": ["Document", "Document with Text", "document", "file-text", "invoice", "new", "page", "pdf"]
		},
		{
			"title": "fa-regular fa-file-lines",
			"searchTerms": ["Document", "Document with Text", "document", "file-text", "invoice", "new", "page", "pdf"]
		},
		{
			"title": "fa-solid fa-file-medical",
			"searchTerms": ["document", "health", "history", "prescription", "record"]
		},
		{
			"title": "fa-regular fa-file-pdf",
			"searchTerms": ["acrobat", "document", "preview", "save"]
		},
		{
			"title": "fa-regular fa-file-pdf",
			"searchTerms": ["acrobat", "document", "preview", "save"]
		},
		{
			"title": "fa-solid fa-file-pen",
			"searchTerms": ["edit", "memo", "pen", "pencil", "update", "write"]
		},
		{
			"title": "fa-regular fa-file-powerpoint",
			"searchTerms": ["display", "document", "keynote", "presentation"]
		},
		{
			"title": "fa-regular fa-file-powerpoint",
			"searchTerms": ["display", "document", "keynote", "presentation"]
		},
		{
			"title": "fa-solid fa-file-prescription",
			"searchTerms": ["document", "drugs", "medical", "medicine", "rx"]
		},
		{
			"title": "fa-solid fa-file-shield",
			"searchTerms": ["antivirus", "data", "document", "protect", "safe", "safety", "secure"]
		},
		{
			"title": "fa-solid fa-file-signature",
			"searchTerms": ["John Hancock", "contract", "document", "name"]
		},
		{
			"title": "fa-regular fa-file-video",
			"searchTerms": ["document", "m4v", "movie", "mp4", "play"]
		},
		{
			"title": "fa-regular fa-file-video",
			"searchTerms": ["document", "m4v", "movie", "mp4", "play"]
		},
		{
			"title": "fa-solid fa-file-waveform",
			"searchTerms": ["document", "health", "history", "prescription", "record"]
		},
		{
			"title": "fa-regular fa-file-word",
			"searchTerms": ["document", "edit", "page", "text", "writing"]
		},
		{
			"title": "fa-regular fa-file-word",
			"searchTerms": ["document", "edit", "page", "text", "writing"]
		},
		{
			"title": "fa-regular fa-file-zipper",
			"searchTerms": [".zip", "bundle", "compress", "compression", "download", "zip"]
		},
		{
			"title": "fa-regular fa-file-zipper",
			"searchTerms": [".zip", "bundle", "compress", "compression", "download", "zip"]
		},
		{
			"title": "fa-solid fa-fill",
			"searchTerms": ["bucket", "color", "paint", "paint bucket"]
		},
		{
			"title": "fa-solid fa-fill-drip",
			"searchTerms": ["bucket", "color", "drop", "paint", "paint bucket", "spill"]
		},
		{
			"title": "fa-solid fa-film",
			"searchTerms": ["cinema", "film", "film frames", "frames", "movie", "strip", "video"]
		},
		{
			"title": "fa-solid fa-filter",
			"searchTerms": ["funnel", "options", "separate", "sort"]
		},
		{
			"title": "fa-solid fa-filter-circle-dollar",
			"searchTerms": ["filter", "money", "options", "separate", "sort"]
		},
		{
			"title": "fa-solid fa-filter-circle-xmark",
			"searchTerms": ["cancel", "funnel", "options", "remove", "separate", "sort"]
		},
		{
			"title": "fa-solid fa-fingerprint",
			"searchTerms": ["human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock"]
		},
		{
			"title": "fa-solid fa-fire",
			"searchTerms": ["burn", "caliente", "fire", "flame", "heat", "hot", "popular", "tool"]
		},
		{
			"title": "fa-solid fa-fire-burner",
			"searchTerms": ["cook", "fire", "flame", "kitchen", "stove"]
		},
		{
			"title": "fa-solid fa-fire-extinguisher",
			"searchTerms": ["burn", "caliente", "extinguish", "fire", "fire extinguisher", "fire fighter", "flame", "heat", "hot", "quench", "rescue"]
		},
		{
			"title": "fa-solid fa-fire-flame-curved",
			"searchTerms": ["burn", "caliente", "flame", "heat", "hot", "popular"]
		},
		{
			"title": "fa-solid fa-fire-flame-simple",
			"searchTerms": ["caliente", "energy", "fire", "flame", "gas", "heat", "hot"]
		},
		{
			"title": "fa-brands fa-firefox",
			"searchTerms": ["browser"]
		},
		{
			"title": "fa-brands fa-firefox-browser",
			"searchTerms": ["browser"]
		},
		{
			"title": "fa-brands fa-first-order",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-first-order-alt",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-firstdraft",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-fish",
			"searchTerms": ["Pisces", "fauna", "fish", "gold", "seafood", "swimming", "zodiac"]
		},
		{
			"title": "fa-solid fa-fish-fins",
			"searchTerms": ["fish", "fishery", "pisces", "seafood"]
		},
		{
			"title": "fa-regular fa-flag",
			"searchTerms": ["black flag", "country", "notice", "notification", "notify", "pole", "report", "symbol", "waving"]
		},
		{
			"title": "fa-regular fa-flag",
			"searchTerms": ["black flag", "country", "notice", "notification", "notify", "pole", "report", "symbol", "waving"]
		},
		{
			"title": "fa-solid fa-flag-checkered",
			"searchTerms": ["checkered", "chequered", "chequered flag", "finish", "notice", "notification", "notify", "pole", "racing", "report", "start", "symbol", "win"]
		},
		{
			"title": "fa-solid fa-flag-usa",
			"searchTerms": ["betsy ross", "country", "fla", "flag: United States", "old glory", "stars", "stripes", "symbol"]
		},
		{
			"title": "fa-solid fa-flask",
			"searchTerms": ["beaker", "chemicals", "experiment", "experimental", "labs", "liquid", "potion", "science", "vial"]
		},
		{
			"title": "fa-solid fa-flask-vial",
			"searchTerms": [" beaker", " chemicals", " experiment", " experimental", " labs", " liquid", " science", " vial", "ampule", "chemistry", "lab", "laboratory", "potion", "test", "test tube"]
		},
		{
			"title": "fa-brands fa-flickr",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-flipboard",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-floppy-disk",
			"searchTerms": ["Black Hard Shell Floppy Disk", "computer", "disk", "download", "floppy", "floppy disk", "floppy-o"]
		},
		{
			"title": "fa-regular fa-floppy-disk",
			"searchTerms": ["Black Hard Shell Floppy Disk", "computer", "disk", "download", "floppy", "floppy disk", "floppy-o"]
		},
		{
			"title": "fa-solid fa-florin-sign",
			"searchTerms": ["currency"]
		},
		{
			"title": "fa-brands fa-fly",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-folder",
			"searchTerms": ["Black Folder", "archive", "directory", "document", "file", "file folder", "folder"]
		},
		{
			"title": "fa-regular fa-folder",
			"searchTerms": ["Black Folder", "archive", "directory", "document", "file", "file folder", "folder"]
		},
		{
			"title": "fa-regular fa-folder-closed",
			"searchTerms": ["file"]
		},
		{
			"title": "fa-regular fa-folder-closed",
			"searchTerms": ["file"]
		},
		{
			"title": "fa-solid fa-folder-minus",
			"searchTerms": ["archive", "delete", "directory", "document", "file", "negative", "remove"]
		},
		{
			"title": "fa-regular fa-folder-open",
			"searchTerms": ["Open Folder", "archive", "directory", "document", "empty", "file", "folder", "new", "open", "open file folder"]
		},
		{
			"title": "fa-regular fa-folder-open",
			"searchTerms": ["Open Folder", "archive", "directory", "document", "empty", "file", "folder", "new", "open", "open file folder"]
		},
		{
			"title": "fa-solid fa-folder-plus",
			"searchTerms": ["add", "archive", "create", "directory", "document", "file", "new", "positive"]
		},
		{
			"title": "fa-solid fa-folder-tree",
			"searchTerms": ["archive", "directory", "document", "file", "search", "structure"]
		},
		{
			"title": "fa-solid fa-font",
			"searchTerms": ["alphabet", "glyph", "text", "type", "typeface"]
		},
		{
			"title": "fa-brands fa-font-awesome",
			"searchTerms": ["awesome", "flag", "font", "icons", "typeface"]
		},
		{
			"title": "fa-brands fa-font-awesome",
			"searchTerms": ["awesome", "flag", "font", "icons", "typeface"]
		},
		{
			"title": "fa-brands fa-font-awesome",
			"searchTerms": ["awesome", "flag", "font", "icons", "typeface"]
		},
		{
			"title": "fa-brands fa-fonticons",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-fonticons-fi",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-football",
			"searchTerms": ["american", "american football", "ball", "fall", "football", "nfl", "pigskin", "seasonal"]
		},
		{
			"title": "fa-brands fa-fort-awesome",
			"searchTerms": ["castle"]
		},
		{
			"title": "fa-brands fa-fort-awesome-alt",
			"searchTerms": ["castle"]
		},
		{
			"title": "fa-brands fa-forumbee",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-forward",
			"searchTerms": ["arrow", "double", "fast", "fast-forward button", "forward", "next", "skip"]
		},
		{
			"title": "fa-solid fa-forward-fast",
			"searchTerms": ["arrow", "end", "last", "next", "next scene", "next track", "next track button", "triangle"]
		},
		{
			"title": "fa-solid fa-forward-step",
			"searchTerms": ["end", "last", "next"]
		},
		{
			"title": "fa-brands fa-foursquare",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-franc-sign",
			"searchTerms": ["French Franc Sign", "currency"]
		},
		{
			"title": "fa-brands fa-free-code-camp",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-freebsd",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-frog",
			"searchTerms": ["amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart"]
		},
		{
			"title": "fa-brands fa-fulcrum",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-futbol",
			"searchTerms": ["ball", "football", "mls", "soccer", "soccer ball"]
		},
		{
			"title": "fa-regular fa-futbol",
			"searchTerms": ["ball", "football", "mls", "soccer", "soccer ball"]
		},
		{
			"title": "fa-solid fa-g",
			"searchTerms": ["Latin Capital Letter G", "Latin Small Letter G", "letter"]
		},
		{
			"title": "fa-brands fa-galactic-republic",
			"searchTerms": ["politics", "star wars"]
		},
		{
			"title": "fa-brands fa-galactic-senate",
			"searchTerms": ["star wars"]
		},
		{
			"title": "fa-solid fa-gamepad",
			"searchTerms": ["arcade", "controller", "d-pad", "joystick", "video", "video game"]
		},
		{
			"title": "fa-solid fa-gas-pump",
			"searchTerms": ["car", "diesel", "fuel", "fuel pump", "fuelpump", "gas", "gasoline", "petrol", "pump", "station"]
		},
		{
			"title": "fa-solid fa-gauge",
			"searchTerms": ["dashboard", "fast", "odometer", "speed", "speedometer"]
		},
		{
			"title": "fa-solid fa-gauge-high",
			"searchTerms": ["dashboard", "fast", "odometer", "speed", "speedometer"]
		},
		{
			"title": "fa-solid fa-gauge-simple",
			"searchTerms": ["dashboard", "fast", "odometer", "speed", "speedometer"]
		},
		{
			"title": "fa-solid fa-gauge-simple-high",
			"searchTerms": ["dashboard", "fast", "odometer", "speed", "speedometer"]
		},
		{
			"title": "fa-solid fa-gavel",
			"searchTerms": ["hammer", "judge", "law", "lawyer", "opinion"]
		},
		{
			"title": "fa-solid fa-gear",
			"searchTerms": ["cog", "cogwheel", "gear", "mechanical", "settings", "sprocket", "tool", "wheel"]
		},
		{
			"title": "fa-solid fa-gears",
			"searchTerms": ["gears", "mechanical", "settings", "sprocket", "wheel"]
		},
		{
			"title": "fa-regular fa-gem",
			"searchTerms": ["diamond", "gem", "gem stone", "jewel", "jewelry", "sapphire", "stone", "treasure"]
		},
		{
			"title": "fa-regular fa-gem",
			"searchTerms": ["diamond", "gem", "gem stone", "jewel", "jewelry", "sapphire", "stone", "treasure"]
		},
		{
			"title": "fa-solid fa-genderless",
			"searchTerms": ["androgynous", "asexual", "gender", "sexless"]
		},
		{
			"title": "fa-brands fa-get-pocket",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-gg",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-gg-circle",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-ghost",
			"searchTerms": ["apparition", "blinky", "clyde", "creature", "face", "fairy tale", "fantasy", "floating", "ghost", "halloween", "holiday", "inky", "monster", "pacman", "pinky", "spirit"]
		},
		{
			"title": "fa-solid fa-gift",
			"searchTerms": ["box", "celebration", "christmas", "generosity", "gift", "giving", "holiday", "party", "present", "wrapped", "wrapped gift", "xmas"]
		},
		{
			"title": "fa-solid fa-gifts",
			"searchTerms": ["christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas"]
		},
		{
			"title": "fa-brands fa-git",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-git-alt",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-github",
			"searchTerms": ["octocat"]
		},
		{
			"title": "fa-brands fa-github-alt",
			"searchTerms": ["octocat"]
		},
		{
			"title": "fa-brands fa-gitkraken",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-gitlab",
			"searchTerms": ["Axosoft"]
		},
		{
			"title": "fa-brands fa-gitter",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-glass-water",
			"searchTerms": ["potable", "water"]
		},
		{
			"title": "fa-solid fa-glass-water-droplet",
			"searchTerms": ["potable", "water"]
		},
		{
			"title": "fa-solid fa-glasses",
			"searchTerms": ["hipster", "nerd", "reading", "sight", "spectacles", "vision"]
		},
		{
			"title": "fa-brands fa-glide",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-glide-g",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-globe",
			"searchTerms": ["all", "coordinates", "country", "earth", "global", "globe", "globe with meridians", "gps", "internet", "language", "localize", "location", "map", "meridians", "network", "online", "place", "planet", "translate", "travel", "world"]
		},
		{
			"title": "fa-brands fa-gofore",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-golang",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-golf-ball-tee",
			"searchTerms": ["caddy", "eagle", "putt", "tee"]
		},
		{
			"title": "fa-brands fa-goodreads",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-goodreads-g",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-google",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-google-drive",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-google-pay",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-google-play",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-google-plus",
			"searchTerms": ["google-plus-circle", "google-plus-official"]
		},
		{
			"title": "fa-brands fa-google-plus-g",
			"searchTerms": ["google-plus", "social network"]
		},
		{
			"title": "fa-brands fa-google-wallet",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-gopuram",
			"searchTerms": ["building", "entrance", "hinduism", "temple", "tower"]
		},
		{
			"title": "fa-solid fa-graduation-cap",
			"searchTerms": ["cap", "celebration", "ceremony", "clothing", "college", "graduate", "graduation", "graduation cap", "hat", "learning", "school", "student"]
		},
		{
			"title": "fa-brands fa-gratipay",
			"searchTerms": ["favorite", "heart", "like", "love"]
		},
		{
			"title": "fa-brands fa-grav",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-greater-than",
			"searchTerms": ["Greater-Than Sign", "arithmetic", "compare", "math"]
		},
		{
			"title": "fa-solid fa-greater-than-equal",
			"searchTerms": ["arithmetic", "compare", "math"]
		},
		{
			"title": "fa-solid fa-grip",
			"searchTerms": ["affordance", "drag", "drop", "grab", "handle"]
		},
		{
			"title": "fa-solid fa-grip-lines",
			"searchTerms": ["affordance", "drag", "drop", "grab", "handle"]
		},
		{
			"title": "fa-solid fa-grip-lines-vertical",
			"searchTerms": ["affordance", "drag", "drop", "grab", "handle"]
		},
		{
			"title": "fa-solid fa-grip-vertical",
			"searchTerms": ["affordance", "drag", "drop", "grab", "handle"]
		},
		{
			"title": "fa-brands fa-gripfire",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-group-arrows-rotate",
			"searchTerms": ["community", "engagement", "spin", "sync"]
		},
		{
			"title": "fa-brands fa-grunt",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-guarani-sign",
			"searchTerms": ["Guarani Sign", "currency"]
		},
		{
			"title": "fa-brands fa-guilded",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-guitar",
			"searchTerms": ["acoustic", "instrument", "music", "rock", "rock and roll", "song", "strings"]
		},
		{
			"title": "fa-brands fa-gulp",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-gun",
			"searchTerms": ["firearm", "pistol", "weapon"]
		},
		{
			"title": "fa-solid fa-h",
			"searchTerms": ["Latin Capital Letter H", "Latin Small Letter H", "letter"]
		},
		{
			"title": "fa-brands fa-hacker-news",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-hackerrank",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-hammer",
			"searchTerms": ["admin", "fix", "hammer", "recovery", "repair", "settings", "tool"]
		},
		{
			"title": "fa-solid fa-hamsa",
			"searchTerms": ["amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection"]
		},
		{
			"title": "fa-regular fa-hand",
			"searchTerms": ["Raised Hand", "backhand", "game", "halt", "palm", "raised", "raised back of hand", "roshambo", "stop"]
		},
		{
			"title": "fa-regular fa-hand",
			"searchTerms": ["Raised Hand", "backhand", "game", "halt", "palm", "raised", "raised back of hand", "roshambo", "stop"]
		},
		{
			"title": "fa-regular fa-hand-back-fist",
			"searchTerms": ["fist", "game", "roshambo"]
		},
		{
			"title": "fa-regular fa-hand-back-fist",
			"searchTerms": ["fist", "game", "roshambo"]
		},
		{
			"title": "fa-solid fa-hand-dots",
			"searchTerms": ["allergy", "freckles", "hand", "hives", "palm", "pox", "skin", "spots"]
		},
		{
			"title": "fa-solid fa-hand-fist",
			"searchTerms": ["Dungeons & Dragons", "clenched", "d&d", "dnd", "fantasy", "fist", "hand", "ki", "monk", "punch", "raised fist", "resist", "strength", "unarmed combat"]
		},
		{
			"title": "fa-solid fa-hand-holding",
			"searchTerms": ["carry", "lift"]
		},
		{
			"title": "fa-solid fa-hand-holding-dollar",
			"searchTerms": ["$", "carry", "dollar sign", "donation", "giving", "lift", "money", "price"]
		},
		{
			"title": "fa-solid fa-hand-holding-droplet",
			"searchTerms": ["carry", "covid-19", "drought", "grow", "lift", "sanitation"]
		},
		{
			"title": "fa-solid fa-hand-holding-hand",
			"searchTerms": ["care", "give", "help", "hold", "protect"]
		},
		{
			"title": "fa-solid fa-hand-holding-heart",
			"searchTerms": ["carry", "charity", "gift", "lift", "package"]
		},
		{
			"title": "fa-solid fa-hand-holding-medical",
			"searchTerms": ["care", "covid-19", "donate", "help"]
		},
		{
			"title": "fa-regular fa-hand-lizard",
			"searchTerms": ["game", "roshambo"]
		},
		{
			"title": "fa-regular fa-hand-lizard",
			"searchTerms": ["game", "roshambo"]
		},
		{
			"title": "fa-solid fa-hand-middle-finger",
			"searchTerms": ["finger", "flip the bird", "gesture", "hand", "hate", "middle finger", "rude"]
		},
		{
			"title": "fa-regular fa-hand-peace",
			"searchTerms": ["hand", "rest", "truce", "v", "victory", "victory hand"]
		},
		{
			"title": "fa-regular fa-hand-peace",
			"searchTerms": ["hand", "rest", "truce", "v", "victory", "victory hand"]
		},
		{
			"title": "fa-regular fa-hand-point-down",
			"searchTerms": ["finger", "hand-o-down", "point"]
		},
		{
			"title": "fa-regular fa-hand-point-down",
			"searchTerms": ["finger", "hand-o-down", "point"]
		},
		{
			"title": "fa-regular fa-hand-point-left",
			"searchTerms": ["back", "finger", "hand-o-left", "left", "point", "previous"]
		},
		{
			"title": "fa-regular fa-hand-point-left",
			"searchTerms": ["back", "finger", "hand-o-left", "left", "point", "previous"]
		},
		{
			"title": "fa-regular fa-hand-point-right",
			"searchTerms": ["finger", "forward", "hand-o-right", "next", "point", "right"]
		},
		{
			"title": "fa-regular fa-hand-point-right",
			"searchTerms": ["finger", "forward", "hand-o-right", "next", "point", "right"]
		},
		{
			"title": "fa-regular fa-hand-point-up",
			"searchTerms": ["finger", "hand", "hand-o-up", "index", "index pointing up", "point", "up"]
		},
		{
			"title": "fa-regular fa-hand-point-up",
			"searchTerms": ["finger", "hand", "hand-o-up", "index", "index pointing up", "point", "up"]
		},
		{
			"title": "fa-regular fa-hand-pointer",
			"searchTerms": ["arrow", "cursor", "select"]
		},
		{
			"title": "fa-regular fa-hand-pointer",
			"searchTerms": ["arrow", "cursor", "select"]
		},
		{
			"title": "fa-regular fa-hand-scissors",
			"searchTerms": ["cut", "game", "roshambo"]
		},
		{
			"title": "fa-regular fa-hand-scissors",
			"searchTerms": ["cut", "game", "roshambo"]
		},
		{
			"title": "fa-solid fa-hand-sparkles",
			"searchTerms": ["clean", "covid-19", "hygiene", "magic", "palm", "soap", "wash"]
		},
		{
			"title": "fa-regular fa-hand-spock",
			"searchTerms": ["finger", "hand", "live long", "palm", "prosper", "salute", "spock", "star trek", "vulcan", "vulcan salute"]
		},
		{
			"title": "fa-regular fa-hand-spock",
			"searchTerms": ["finger", "hand", "live long", "palm", "prosper", "salute", "spock", "star trek", "vulcan", "vulcan salute"]
		},
		{
			"title": "fa-solid fa-handcuffs",
			"searchTerms": ["arrest", "criminal", "handcuffs", "jail", "lock", "police", "wrist"]
		},
		{
			"title": "fa-solid fa-hands",
			"searchTerms": ["Translate", "asl", "deaf", "hands"]
		},
		{
			"title": "fa-solid fa-hands-asl-interpreting",
			"searchTerms": ["asl", "deaf", "finger", "hand", "interpret", "speak"]
		},
		{
			"title": "fa-solid fa-hands-bound",
			"searchTerms": ["abduction", "bound", "handcuff", "wrist"]
		},
		{
			"title": "fa-solid fa-hands-bubbles",
			"searchTerms": ["covid-19", "hygiene", "soap", "wash"]
		},
		{
			"title": "fa-solid fa-hands-clapping",
			"searchTerms": ["applause", "clap", "clapping hands", "hand"]
		},
		{
			"title": "fa-solid fa-hands-holding",
			"searchTerms": ["carry", "hold", "lift"]
		},
		{
			"title": "fa-solid fa-hands-holding-child",
			"searchTerms": ["care", "give", "help", "hold", "protect"]
		},
		{
			"title": "fa-solid fa-hands-holding-circle",
			"searchTerms": ["circle", "gift", "protection"]
		},
		{
			"title": "fa-solid fa-hands-praying",
			"searchTerms": ["kneel", "preach", "religion", "worship"]
		},
		{
			"title": "fa-regular fa-handshake",
			"searchTerms": ["agreement", "greeting", "meeting", "partnership"]
		},
		{
			"title": "fa-regular fa-handshake",
			"searchTerms": ["agreement", "greeting", "meeting", "partnership"]
		},
		{
			"title": "fa-solid fa-handshake-angle",
			"searchTerms": ["aid", "assistance", "handshake", "partnership", "volunteering"]
		},
		{
			"title": "fa-solid fa-handshake-simple",
			"searchTerms": ["agreement", "greeting", "hand", "handshake", "meeting", "partnership", "shake"]
		},
		{
			"title": "fa-solid fa-handshake-simple-slash",
			"searchTerms": ["broken", "covid-19", "social distance"]
		},
		{
			"title": "fa-solid fa-handshake-slash",
			"searchTerms": ["broken", "covid-19", "social distance"]
		},
		{
			"title": "fa-solid fa-hanukiah",
			"searchTerms": ["candelabrum", "candle", "candlestick", "hanukkah", "jewish", "judaism", "light", "menorah", "religion"]
		},
		{
			"title": "fa-regular fa-hard-drive",
			"searchTerms": ["Hard Disk", "cpu", "hard drive", "harddrive", "machine", "save", "storage"]
		},
		{
			"title": "fa-regular fa-hard-drive",
			"searchTerms": ["Hard Disk", "cpu", "hard drive", "harddrive", "machine", "save", "storage"]
		},
		{
			"title": "fa-brands fa-hashnode",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-hashtag",
			"searchTerms": ["Number Sign", "Twitter", "instagram", "pound", "social media", "tag"]
		},
		{
			"title": "fa-solid fa-hat-cowboy",
			"searchTerms": ["buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler"]
		},
		{
			"title": "fa-solid fa-hat-cowboy-side",
			"searchTerms": ["buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler"]
		},
		{
			"title": "fa-solid fa-hat-wizard",
			"searchTerms": ["Dungeons & Dragons", "accessory", "buckle", "clothing", "d&d", "dnd", "fantasy", "halloween", "head", "holiday", "mage", "magic", "pointy", "witch"]
		},
		{
			"title": "fa-solid fa-head-side-cough",
			"searchTerms": ["cough", "covid-19", "germs", "lungs", "respiratory", "sick"]
		},
		{
			"title": "fa-solid fa-head-side-cough-slash",
			"searchTerms": ["cough", "covid-19", "germs", "lungs", "respiratory", "sick"]
		},
		{
			"title": "fa-solid fa-head-side-mask",
			"searchTerms": ["breath", "coronavirus", "covid-19", "filter", "flu", "infection", "pandemic", "respirator", "virus"]
		},
		{
			"title": "fa-solid fa-head-side-virus",
			"searchTerms": ["cold", "coronavirus", "covid-19", "flu", "infection", "pandemic", "sick"]
		},
		{
			"title": "fa-solid fa-heading",
			"searchTerms": ["format", "header", "text", "title"]
		},
		{
			"title": "fa-solid fa-headphones",
			"searchTerms": ["audio", "earbud", "headphone", "listen", "music", "sound", "speaker"]
		},
		{
			"title": "fa-solid fa-headphones-simple",
			"searchTerms": ["audio", "listen", "music", "sound", "speaker"]
		},
		{
			"title": "fa-solid fa-headset",
			"searchTerms": ["audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer"]
		},
		{
			"title": "fa-regular fa-heart",
			"searchTerms": ["black", "black heart", "blue", "blue heart", "brown", "brown heart", "card", "evil", "favorite", "game", "green", "green heart", "heart", "heart suit", "like", "love", "orange", "orange heart", "purple", "purple heart", "red heart", "relationship", "valentine", "white", "white heart", "wicked", "yellow", "yellow heart"]
		},
		{
			"title": "fa-regular fa-heart",
			"searchTerms": ["black", "black heart", "blue", "blue heart", "brown", "brown heart", "card", "evil", "favorite", "game", "green", "green heart", "heart", "heart suit", "like", "love", "orange", "orange heart", "purple", "purple heart", "red heart", "relationship", "valentine", "white", "white heart", "wicked", "yellow", "yellow heart"]
		},
		{
			"title": "fa-solid fa-heart-circle-bolt",
			"searchTerms": ["cardiogram", "ekg", "electric", "heart", "love", "pacemaker"]
		},
		{
			"title": "fa-solid fa-heart-circle-check",
			"searchTerms": ["favorite", "heart", "love", "not affected", "ok", "okay"]
		},
		{
			"title": "fa-solid fa-heart-circle-exclamation",
			"searchTerms": ["favorite", "heart", "love"]
		},
		{
			"title": "fa-solid fa-heart-circle-minus",
			"searchTerms": ["favorite", "heart", "love"]
		},
		{
			"title": "fa-solid fa-heart-circle-plus",
			"searchTerms": ["favorite", "heart", "love"]
		},
		{
			"title": "fa-solid fa-heart-circle-xmark",
			"searchTerms": ["favorite", "heart", "love"]
		},
		{
			"title": "fa-solid fa-heart-crack",
			"searchTerms": ["break", "breakup", "broken", "broken heart", "crushed", "dislike", "dumped", "grief", "love", "lovesick", "relationship", "sad"]
		},
		{
			"title": "fa-solid fa-heart-pulse",
			"searchTerms": ["ekg", "electrocardiogram", "health", "lifeline", "vital signs"]
		},
		{
			"title": "fa-solid fa-helicopter",
			"searchTerms": ["airwolf", "apache", "chopper", "flight", "fly", "helicopter", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-helicopter-symbol",
			"searchTerms": ["chopper", "helicopter", "landing pad", "whirlybird"]
		},
		{
			"title": "fa-solid fa-helmet-safety",
			"searchTerms": ["construction", "hardhat", "helmet", "safety"]
		},
		{
			"title": "fa-solid fa-helmet-un",
			"searchTerms": ["helmet", "united nations"]
		},
		{
			"title": "fa-solid fa-highlighter",
			"searchTerms": ["edit", "marker", "sharpie", "update", "write"]
		},
		{
			"title": "fa-solid fa-hill-avalanche",
			"searchTerms": ["mudslide", "snow", "winter"]
		},
		{
			"title": "fa-solid fa-hill-rockslide",
			"searchTerms": ["mudslide"]
		},
		{
			"title": "fa-solid fa-hippo",
			"searchTerms": ["animal", "fauna", "hippo", "hippopotamus", "hungry", "mammal"]
		},
		{
			"title": "fa-brands fa-hips",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-hire-a-helper",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-hive",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-hockey-puck",
			"searchTerms": ["ice", "nhl", "sport"]
		},
		{
			"title": "fa-solid fa-holly-berry",
			"searchTerms": ["catwoman", "christmas", "decoration", "flora", "halle", "holiday", "ororo munroe", "plant", "storm", "xmas"]
		},
		{
			"title": "fa-brands fa-hooli",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-hornbill",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-horse",
			"searchTerms": ["equestrian", "equus", "fauna", "horse", "mammmal", "mare", "neigh", "pony", "racehorse", "racing"]
		},
		{
			"title": "fa-solid fa-horse-head",
			"searchTerms": ["equus", "fauna", "mammmal", "mare", "neigh", "pony"]
		},
		{
			"title": "fa-regular fa-hospital",
			"searchTerms": ["building", "covid-19", "doctor", "emergency room", "hospital", "medical center", "medicine"]
		},
		{
			"title": "fa-regular fa-hospital",
			"searchTerms": ["building", "covid-19", "doctor", "emergency room", "hospital", "medical center", "medicine"]
		},
		{
			"title": "fa-solid fa-hospital-user",
			"searchTerms": ["covid-19", "doctor", "network", "patient", "primary care"]
		},
		{
			"title": "fa-solid fa-hot-tub-person",
			"searchTerms": ["jacuzzi", "spa"]
		},
		{
			"title": "fa-solid fa-hotdog",
			"searchTerms": ["bun", "chili", "frankfurt", "frankfurter", "hot dog", "hotdog", "kosher", "polish", "sandwich", "sausage", "vienna", "weiner"]
		},
		{
			"title": "fa-solid fa-hotel",
			"searchTerms": ["building", "hotel", "inn", "lodging", "motel", "resort", "travel"]
		},
		{
			"title": "fa-brands fa-hotjar",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-hourglass",
			"searchTerms": ["hour", "hourglass", "hourglass not done", "minute", "sand", "stopwatch", "time", "timer"]
		},
		{
			"title": "fa-regular fa-hourglass",
			"searchTerms": ["hour", "hourglass", "hourglass not done", "minute", "sand", "stopwatch", "time", "timer"]
		},
		{
			"title": "fa-solid fa-hourglass-end",
			"searchTerms": ["hour", "hourglass done", "minute", "sand", "stopwatch", "time", "timer"]
		},
		{
			"title": "fa-regular fa-hourglass-half",
			"searchTerms": ["hour", "minute", "sand", "stopwatch", "time"]
		},
		{
			"title": "fa-regular fa-hourglass-half",
			"searchTerms": ["hour", "minute", "sand", "stopwatch", "time"]
		},
		{
			"title": "fa-solid fa-hourglass-start",
			"searchTerms": ["hour", "minute", "sand", "stopwatch", "time"]
		},
		{
			"title": "fa-solid fa-house",
			"searchTerms": ["abode", "building", "home", "house", "main", "residence"]
		},
		{
			"title": "fa-solid fa-house-chimney",
			"searchTerms": ["abode", "building", "chimney", "house", "main", "residence", "smokestack"]
		},
		{
			"title": "fa-solid fa-house-chimney-crack",
			"searchTerms": ["building", "devastation", "disaster", "earthquake", "home", "insurance"]
		},
		{
			"title": "fa-solid fa-house-chimney-medical",
			"searchTerms": ["covid-19", "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient"]
		},
		{
			"title": "fa-solid fa-house-chimney-user",
			"searchTerms": ["covid-19", "home", "isolation", "quarantine"]
		},
		{
			"title": "fa-solid fa-house-chimney-window",
			"searchTerms": ["abode", "building", "family", "home", "residence"]
		},
		{
			"title": "fa-solid fa-house-circle-check",
			"searchTerms": ["abode", "home", "house", "not affected", "ok", "okay"]
		},
		{
			"title": "fa-solid fa-house-circle-exclamation",
			"searchTerms": ["abode", "affected", "home", "house"]
		},
		{
			"title": "fa-solid fa-house-circle-xmark",
			"searchTerms": ["abode", "destroy", "home", "house"]
		},
		{
			"title": "fa-solid fa-house-crack",
			"searchTerms": ["building", "devastation", "disaster", "earthquake", "home", "insurance"]
		},
		{
			"title": "fa-solid fa-house-fire",
			"searchTerms": ["burn", "emergency", "home"]
		},
		{
			"title": "fa-solid fa-house-flag",
			"searchTerms": ["camp", "home"]
		},
		{
			"title": "fa-solid fa-house-flood-water",
			"searchTerms": ["damage", "flood", "water"]
		},
		{
			"title": "fa-solid fa-house-flood-water-circle-arrow-right",
			"searchTerms": ["damage", "flood", "water"]
		},
		{
			"title": "fa-solid fa-house-laptop",
			"searchTerms": ["computer", "covid-19", "device", "office", "remote", "work from home"]
		},
		{
			"title": "fa-solid fa-house-lock",
			"searchTerms": ["closed", "home", "house", "lockdown", "quarantine"]
		},
		{
			"title": "fa-solid fa-house-medical",
			"searchTerms": ["covid-19", "doctor", "facility", "general practitioner", "health", "hospital", "infirmary", "medicine", "office", "outpatient"]
		},
		{
			"title": "fa-solid fa-house-medical-circle-check",
			"searchTerms": ["clinic", "hospital", "not affected", "ok", "okay"]
		},
		{
			"title": "fa-solid fa-house-medical-circle-exclamation",
			"searchTerms": ["affected", "clinic", "hospital"]
		},
		{
			"title": "fa-solid fa-house-medical-circle-xmark",
			"searchTerms": ["clinic", "destroy", "hospital"]
		},
		{
			"title": "fa-solid fa-house-medical-flag",
			"searchTerms": ["clinic", "hospital", "mash"]
		},
		{
			"title": "fa-solid fa-house-signal",
			"searchTerms": ["abode", "building", "connect", "family", "home", "residence", "smart home", "wifi"]
		},
		{
			"title": "fa-solid fa-house-tsunami",
			"searchTerms": ["damage", "flood", "tidal wave", "wave"]
		},
		{
			"title": "fa-solid fa-house-user",
			"searchTerms": ["house"]
		},
		{
			"title": "fa-brands fa-houzz",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-hryvnia-sign",
			"searchTerms": ["Hryvnia Sign", "currency"]
		},
		{
			"title": "fa-brands fa-html5",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-hubspot",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-hurricane",
			"searchTerms": ["coriolis effect", "eye", "storm", "tropical cyclone", "typhoon"]
		},
		{
			"title": "fa-solid fa-i",
			"searchTerms": ["Latin Capital Letter I", "Latin Small Letter I", "letter"]
		},
		{
			"title": "fa-solid fa-i-cursor",
			"searchTerms": ["editing", "i-beam", "type", "writing"]
		},
		{
			"title": "fa-solid fa-ice-cream",
			"searchTerms": ["chocolate", "cone", "cream", "dessert", "frozen", "ice", "ice cream", "scoop", "sorbet", "sweet", "vanilla", "yogurt"]
		},
		{
			"title": "fa-solid fa-icicles",
			"searchTerms": ["cold", "frozen", "hanging", "ice", "seasonal", "sharp"]
		},
		{
			"title": "fa-solid fa-icons",
			"searchTerms": ["bolt", "emoji", "heart", "image", "music", "photo", "symbols"]
		},
		{
			"title": "fa-regular fa-id-badge",
			"searchTerms": ["address", "contact", "identification", "license", "profile"]
		},
		{
			"title": "fa-regular fa-id-badge",
			"searchTerms": ["address", "contact", "identification", "license", "profile"]
		},
		{
			"title": "fa-regular fa-id-card",
			"searchTerms": ["contact", "demographics", "document", "identification", "issued", "profile", "registration"]
		},
		{
			"title": "fa-regular fa-id-card",
			"searchTerms": ["contact", "demographics", "document", "identification", "issued", "profile", "registration"]
		},
		{
			"title": "fa-solid fa-id-card-clip",
			"searchTerms": ["contact", "demographics", "document", "identification", "issued", "profile"]
		},
		{
			"title": "fa-brands fa-ideal",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-igloo",
			"searchTerms": ["dome", "dwelling", "eskimo", "home", "house", "ice", "snow"]
		},
		{
			"title": "fa-regular fa-image",
			"searchTerms": ["album", "landscape", "photo", "picture"]
		},
		{
			"title": "fa-regular fa-image",
			"searchTerms": ["album", "landscape", "photo", "picture"]
		},
		{
			"title": "fa-solid fa-image-portrait",
			"searchTerms": ["id", "image", "photo", "picture", "selfie"]
		},
		{
			"title": "fa-regular fa-images",
			"searchTerms": ["album", "landscape", "photo", "picture"]
		},
		{
			"title": "fa-regular fa-images",
			"searchTerms": ["album", "landscape", "photo", "picture"]
		},
		{
			"title": "fa-brands fa-imdb",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-inbox",
			"searchTerms": ["archive", "desk", "email", "mail", "message"]
		},
		{
			"title": "fa-solid fa-indent",
			"searchTerms": ["align", "justify", "paragraph", "tab"]
		},
		{
			"title": "fa-solid fa-indian-rupee-sign",
			"searchTerms": ["Indian Rupee Sign", "currency"]
		},
		{
			"title": "fa-solid fa-industry",
			"searchTerms": ["building", "factory", "industrial", "manufacturing", "mill", "warehouse"]
		},
		{
			"title": "fa-solid fa-infinity",
			"searchTerms": ["Infinity", "eternity", "forever", "infinity", "math", "unbounded", "universal"]
		},
		{
			"title": "fa-solid fa-info",
			"searchTerms": ["details", "help", "information", "more", "support"]
		},
		{
			"title": "fa-brands fa-instagram",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-instalod",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-intercom",
			"searchTerms": ["app", "customer", "messenger"]
		},
		{
			"title": "fa-brands fa-internet-explorer",
			"searchTerms": ["browser", "ie"]
		},
		{
			"title": "fa-brands fa-invision",
			"searchTerms": ["app", "design", "interface"]
		},
		{
			"title": "fa-brands fa-ioxhost",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-italic",
			"searchTerms": ["edit", "emphasis", "font", "format", "text", "type"]
		},
		{
			"title": "fa-brands fa-itch-io",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-itunes",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-itunes-note",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-j",
			"searchTerms": ["Latin Capital Letter J", "Latin Small Letter J", "letter"]
		},
		{
			"title": "fa-solid fa-jar",
			"searchTerms": ["jam", "jelly", "storage"]
		},
		{
			"title": "fa-solid fa-jar-wheat",
			"searchTerms": ["flour", "storage"]
		},
		{
			"title": "fa-brands fa-java",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-jedi",
			"searchTerms": ["crest", "force", "sith", "skywalker", "star wars", "yoda"]
		},
		{
			"title": "fa-brands fa-jedi-order",
			"searchTerms": ["star wars"]
		},
		{
			"title": "fa-brands fa-jenkins",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-jet-fighter",
			"searchTerms": ["airforce", "airplane", "airport", "fast", "fly", "goose", "marines", "maverick", "military", "plane", "quick", "top gun", "transportation", "travel"]
		},
		{
			"title": "fa-solid fa-jet-fighter-up",
			"searchTerms": ["airforce", "airplane", "airport", "fast", "fly", "goose", "marines", "maverick", "military", "plane", "quick", "top gun", "transportation", "travel"]
		},
		{
			"title": "fa-brands fa-jira",
			"searchTerms": ["atlassian"]
		},
		{
			"title": "fa-brands fa-joget",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-joint",
			"searchTerms": ["blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff"]
		},
		{
			"title": "fa-brands fa-joomla",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-js",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-jsfiddle",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-jug-detergent",
			"searchTerms": ["detergent", "laundry", "soap", "wash"]
		},
		{
			"title": "fa-solid fa-k",
			"searchTerms": ["Latin Capital Letter K", "Latin Small Letter K", "letter"]
		},
		{
			"title": "fa-solid fa-kaaba",
			"searchTerms": ["Muslim", "building", "cube", "islam", "kaaba", "muslim", "religion"]
		},
		{
			"title": "fa-brands fa-kaggle",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-key",
			"searchTerms": ["key", "lock", "password", "private", "secret", "unlock"]
		},
		{
			"title": "fa-brands fa-keybase",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-keyboard",
			"searchTerms": ["accessory", "computer", "edit", "input", "keyboard", "text", "type", "write"]
		},
		{
			"title": "fa-regular fa-keyboard",
			"searchTerms": ["accessory", "computer", "edit", "input", "keyboard", "text", "type", "write"]
		},
		{
			"title": "fa-brands fa-keycdn",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-khanda",
			"searchTerms": ["Adi Shakti", "chakkar", "sikh", "sikhism", "sword"]
		},
		{
			"title": "fa-brands fa-kickstarter",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-kickstarter-k",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-kip-sign",
			"searchTerms": ["Kip Sign", "currency"]
		},
		{
			"title": "fa-solid fa-kit-medical",
			"searchTerms": ["emergency", "emt", "health", "medical", "rescue"]
		},
		{
			"title": "fa-solid fa-kitchen-set",
			"searchTerms": ["chef", "cook", "cup", "kitchen", "pan", "pot", "skillet"]
		},
		{
			"title": "fa-solid fa-kiwi-bird",
			"searchTerms": ["bird", "fauna", "new zealand"]
		},
		{
			"title": "fa-brands fa-korvue",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-l",
			"searchTerms": ["Latin Capital Letter L", "Latin Small Letter L", "letter"]
		},
		{
			"title": "fa-solid fa-land-mine-on",
			"searchTerms": ["bomb", "danger", "explosion", "war"]
		},
		{
			"title": "fa-solid fa-landmark",
			"searchTerms": ["building", "classical", "historic", "memorable", "monument", "museum", "politics"]
		},
		{
			"title": "fa-solid fa-landmark-dome",
			"searchTerms": ["building", "historic", "memorable", "monument", "politics"]
		},
		{
			"title": "fa-solid fa-landmark-flag",
			"searchTerms": ["capitol", "flag", "landmark", "memorial"]
		},
		{
			"title": "fa-solid fa-language",
			"searchTerms": ["dialect", "idiom", "localize", "speech", "translate", "vernacular"]
		},
		{
			"title": "fa-solid fa-laptop",
			"searchTerms": ["computer", "cpu", "dell", "demo", "device", "laptop", "mac", "macbook", "machine", "pc", "personal"]
		},
		{
			"title": "fa-solid fa-laptop-code",
			"searchTerms": ["computer", "cpu", "dell", "demo", "develop", "device", "mac", "macbook", "machine", "pc"]
		},
		{
			"title": "fa-solid fa-laptop-file",
			"searchTerms": ["computer", "education", "laptop", "learning", "remote work"]
		},
		{
			"title": "fa-solid fa-laptop-medical",
			"searchTerms": ["computer", "device", "ehr", "electronic health records", "history"]
		},
		{
			"title": "fa-brands fa-laravel",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-lari-sign",
			"searchTerms": ["Lari Sign", "currency"]
		},
		{
			"title": "fa-brands fa-lastfm",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-layer-group",
			"searchTerms": ["arrange", "develop", "layers", "map", "stack"]
		},
		{
			"title": "fa-solid fa-leaf",
			"searchTerms": ["eco", "flora", "nature", "plant", "vegan"]
		},
		{
			"title": "fa-brands fa-leanpub",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-left-long",
			"searchTerms": ["back", "long-arrow-left", "previous"]
		},
		{
			"title": "fa-solid fa-left-right",
			"searchTerms": ["arrow", "arrows-h", "expand", "horizontal", "landscape", "left-right arrow", "resize", "wide"]
		},
		{
			"title": "fa-regular fa-lemon",
			"searchTerms": ["citrus", "fruit", "lemon", "lemonade", "lime", "tart"]
		},
		{
			"title": "fa-regular fa-lemon",
			"searchTerms": ["citrus", "fruit", "lemon", "lemonade", "lime", "tart"]
		},
		{
			"title": "fa-brands fa-less",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-less-than",
			"searchTerms": ["Less-Than Sign", "arithmetic", "compare", "math"]
		},
		{
			"title": "fa-solid fa-less-than-equal",
			"searchTerms": ["arithmetic", "compare", "math"]
		},
		{
			"title": "fa-regular fa-life-ring",
			"searchTerms": ["coast guard", "help", "overboard", "save", "support"]
		},
		{
			"title": "fa-regular fa-life-ring",
			"searchTerms": ["coast guard", "help", "overboard", "save", "support"]
		},
		{
			"title": "fa-regular fa-lightbulb",
			"searchTerms": [" comic", " electric", " idea", " innovation", " inspiration", " light", " light bulb", " bulb", "bulb", "comic", "electric", "energy", "idea", "inspiration", "mechanical"]
		},
		{
			"title": "fa-regular fa-lightbulb",
			"searchTerms": [" comic", " electric", " idea", " innovation", " inspiration", " light", " light bulb", " bulb", "bulb", "comic", "electric", "energy", "idea", "inspiration", "mechanical"]
		},
		{
			"title": "fa-brands fa-line",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-lines-leaning",
			"searchTerms": ["canted", "domino", "falling", "resilience", "resilient", "tipped"]
		},
		{
			"title": "fa-solid fa-link",
			"searchTerms": ["attach", "attachment", "chain", "connect", "lin", "link"]
		},
		{
			"title": "fa-solid fa-link-slash",
			"searchTerms": ["attachment", "chain", "chain-broken", "remove"]
		},
		{
			"title": "fa-brands fa-linkedin",
			"searchTerms": ["linkedin-square"]
		},
		{
			"title": "fa-brands fa-linkedin-in",
			"searchTerms": ["linkedin"]
		},
		{
			"title": "fa-brands fa-linode",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-linux",
			"searchTerms": ["tux"]
		},
		{
			"title": "fa-solid fa-lira-sign",
			"searchTerms": ["Lira Sign", "currency"]
		},
		{
			"title": "fa-solid fa-list",
			"searchTerms": ["checklist", "completed", "done", "finished", "ol", "todo", "ul"]
		},
		{
			"title": "fa-solid fa-list-check",
			"searchTerms": ["checklist", "downloading", "downloads", "loading", "progress", "project management", "settings", "to do"]
		},
		{
			"title": "fa-solid fa-list-ol",
			"searchTerms": ["checklist", "completed", "done", "finished", "numbers", "ol", "todo", "ul"]
		},
		{
			"title": "fa-solid fa-list-ul",
			"searchTerms": ["checklist", "completed", "done", "finished", "ol", "todo", "ul"]
		},
		{
			"title": "fa-solid fa-litecoin-sign",
			"searchTerms": ["currency"]
		},
		{
			"title": "fa-solid fa-location-arrow",
			"searchTerms": ["address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place"]
		},
		{
			"title": "fa-solid fa-location-crosshairs",
			"searchTerms": ["address", "coordinate", "direction", "gps", "location", "map", "navigation", "place", "where"]
		},
		{
			"title": "fa-solid fa-location-dot",
			"searchTerms": ["address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel"]
		},
		{
			"title": "fa-solid fa-location-pin",
			"searchTerms": ["address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel"]
		},
		{
			"title": "fa-solid fa-location-pin-lock",
			"searchTerms": ["closed", "lockdown", "map", "quarantine"]
		},
		{
			"title": "fa-solid fa-lock",
			"searchTerms": ["admin", "closed", "lock", "locked", "open", "password", "private", "protect", "security"]
		},
		{
			"title": "fa-solid fa-lock-open",
			"searchTerms": ["admin", "lock", "open", "password", "private", "protect", "security", "unlock"]
		},
		{
			"title": "fa-solid fa-locust",
			"searchTerms": ["horde", "infestation", "locust", "plague", "swarm"]
		},
		{
			"title": "fa-solid fa-lungs",
			"searchTerms": ["air", "breath", "covid-19", "exhalation", "inhalation", "lungs", "organ", "respiration", "respiratory"]
		},
		{
			"title": "fa-solid fa-lungs-virus",
			"searchTerms": ["breath", "coronavirus", "covid-19", "flu", "infection", "pandemic", "respiratory", "sick"]
		},
		{
			"title": "fa-brands fa-lyft",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-m",
			"searchTerms": ["Latin Capital Letter M", "Latin Small Letter M", "letter"]
		},
		{
			"title": "fa-brands fa-magento",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-magnet",
			"searchTerms": ["Attract", "attraction", "horseshoe", "lodestone", "magnet", "magnetic", "tool"]
		},
		{
			"title": "fa-solid fa-magnifying-glass",
			"searchTerms": ["bigger", "enlarge", "find", "glass", "magnify", "magnifying", "magnifying glass tilted left", "preview", "search", "tool", "zoom"]
		},
		{
			"title": "fa-solid fa-magnifying-glass-arrow-right",
			"searchTerms": ["find", "next", "search"]
		},
		{
			"title": "fa-solid fa-magnifying-glass-chart",
			"searchTerms": [" data", " graph", " intelligence", "analysis", "chart", "market"]
		},
		{
			"title": "fa-solid fa-magnifying-glass-dollar",
			"searchTerms": ["bigger", "enlarge", "find", "magnify", "money", "preview", "zoom"]
		},
		{
			"title": "fa-solid fa-magnifying-glass-location",
			"searchTerms": ["bigger", "enlarge", "find", "magnify", "preview", "zoom"]
		},
		{
			"title": "fa-solid fa-magnifying-glass-minus",
			"searchTerms": ["minify", "negative", "smaller", "zoom", "zoom out"]
		},
		{
			"title": "fa-solid fa-magnifying-glass-plus",
			"searchTerms": ["bigger", "enlarge", "magnify", "positive", "zoom", "zoom in"]
		},
		{
			"title": "fa-brands fa-mailchimp",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-manat-sign",
			"searchTerms": ["Manat Sign", "currency"]
		},
		{
			"title": "fa-brands fa-mandalorian",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-map",
			"searchTerms": ["address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel", "world", "world map"]
		},
		{
			"title": "fa-regular fa-map",
			"searchTerms": ["address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel", "world", "world map"]
		},
		{
			"title": "fa-solid fa-map-location",
			"searchTerms": ["address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel"]
		},
		{
			"title": "fa-solid fa-map-location-dot",
			"searchTerms": ["address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel"]
		},
		{
			"title": "fa-solid fa-map-pin",
			"searchTerms": ["address", "agree", "coordinates", "destination", "gps", "localize", "location", "map", "marker", "navigation", "pin", "place", "position", "pushpin", "round pushpin", "travel"]
		},
		{
			"title": "fa-brands fa-markdown",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-marker",
			"searchTerms": ["design", "edit", "sharpie", "update", "write"]
		},
		{
			"title": "fa-solid fa-mars",
			"searchTerms": ["gender", "male", "male sign", "man"]
		},
		{
			"title": "fa-solid fa-mars-and-venus",
			"searchTerms": ["Male and Female Sign", "female", "gender", "intersex", "male", "transgender"]
		},
		{
			"title": "fa-solid fa-mars-and-venus-burst",
			"searchTerms": ["gender", "violence"]
		},
		{
			"title": "fa-solid fa-mars-double",
			"searchTerms": ["Doubled Male Sign", "gay", "gender", "male", "men"]
		},
		{
			"title": "fa-solid fa-mars-stroke",
			"searchTerms": ["Male with Stroke Sign", "gender", "transgender"]
		},
		{
			"title": "fa-solid fa-mars-stroke-right",
			"searchTerms": ["Horizontal Male with Stroke Sign", "gender"]
		},
		{
			"title": "fa-solid fa-mars-stroke-up",
			"searchTerms": ["Vertical Male with Stroke Sign", "gender"]
		},
		{
			"title": "fa-solid fa-martini-glass",
			"searchTerms": ["alcohol", "bar", "beverage", "cocktail", "cocktail glass", "drink", "glass", "liquor"]
		},
		{
			"title": "fa-solid fa-martini-glass-citrus",
			"searchTerms": ["alcohol", "beverage", "drink", "gin", "glass", "margarita", "martini", "vodka"]
		},
		{
			"title": "fa-solid fa-martini-glass-empty",
			"searchTerms": ["alcohol", "bar", "beverage", "drink", "liquor"]
		},
		{
			"title": "fa-solid fa-mask",
			"searchTerms": ["carnivale", "costume", "disguise", "halloween", "secret", "super hero"]
		},
		{
			"title": "fa-solid fa-mask-face",
			"searchTerms": ["breath", "coronavirus", "covid-19", "filter", "flu", "infection", "pandemic", "respirator", "virus"]
		},
		{
			"title": "fa-solid fa-mask-ventilator",
			"searchTerms": ["breath", "gas", "mask", "oxygen", "respirator", "ventilator"]
		},
		{
			"title": "fa-solid fa-masks-theater",
			"searchTerms": ["art", "comedy", "mask", "perform", "performing", "performing arts", "theater", "theatre", "tragedy"]
		},
		{
			"title": "fa-brands fa-mastodon",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-mattress-pillow",
			"searchTerms": ["air mattress", "mattress", "pillow", "rest", "sleep"]
		},
		{
			"title": "fa-brands fa-maxcdn",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-maximize",
			"searchTerms": ["bigger", "enlarge", "fullscreen", "move", "resize"]
		},
		{
			"title": "fa-brands fa-mdb",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-medal",
			"searchTerms": ["award", "medal", "ribbon", "sports medal", "star", "trophy"]
		},
		{
			"title": "fa-brands fa-medapps",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-medium",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-medrt",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-meetup",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-megaport",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-memory",
			"searchTerms": ["DIMM", "RAM", "hardware", "storage", "technology"]
		},
		{
			"title": "fa-brands fa-mendeley",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-menorah",
			"searchTerms": ["candle", "hanukkah", "jewish", "judaism", "light"]
		},
		{
			"title": "fa-solid fa-mercury",
			"searchTerms": ["Mercury", "gender", "hybrid", "transgender"]
		},
		{
			"title": "fa-regular fa-message",
			"searchTerms": ["bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
		},
		{
			"title": "fa-regular fa-message",
			"searchTerms": ["bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
		},
		{
			"title": "fa-brands fa-meta",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-meteor",
			"searchTerms": ["armageddon", "asteroid", "comet", "shooting star", "space"]
		},
		{
			"title": "fa-brands fa-microblog",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-microchip",
			"searchTerms": ["cpu", "hardware", "processor", "technology"]
		},
		{
			"title": "fa-solid fa-microphone",
			"searchTerms": ["address", "audio", "information", "podcast", "public", "record", "sing", "sound", "voice"]
		},
		{
			"title": "fa-solid fa-microphone-lines",
			"searchTerms": ["audio", "mic", "microphone", "music", "podcast", "record", "sing", "sound", "studio", "studio microphone", "voice"]
		},
		{
			"title": "fa-solid fa-microphone-lines-slash",
			"searchTerms": ["audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice"]
		},
		{
			"title": "fa-solid fa-microphone-slash",
			"searchTerms": ["audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice"]
		},
		{
			"title": "fa-solid fa-microscope",
			"searchTerms": ["covid-19", "electron", "lens", "microscope", "optics", "science", "shrink", "testing", "tool"]
		},
		{
			"title": "fa-brands fa-microsoft",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-mill-sign",
			"searchTerms": ["Mill Sign", "currency"]
		},
		{
			"title": "fa-solid fa-minimize",
			"searchTerms": ["collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller"]
		},
		{
			"title": "fa-solid fa-minus",
			"searchTerms": ["En Dash", "Minus Sign", "collapse", "delete", "hide", "math", "minify", "minus", "negative", "remove", "sign", "trash", "−"]
		},
		{
			"title": "fa-solid fa-mitten",
			"searchTerms": ["clothing", "cold", "glove", "hands", "knitted", "seasonal", "warmth"]
		},
		{
			"title": "fa-brands fa-mix",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-mixcloud",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-mixer",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-mizuni",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-mobile",
			"searchTerms": ["android", "call", "cell", "cell phone", "device", "mobile", "mobile phone", "number", "phone", "screen", "telephone", "text"]
		},
		{
			"title": "fa-solid fa-mobile-button",
			"searchTerms": ["apple", "call", "cell phone", "device", "iphone", "number", "screen", "telephone"]
		},
		{
			"title": "fa-solid fa-mobile-retro",
			"searchTerms": ["cellphone", "cellular", "phone"]
		},
		{
			"title": "fa-solid fa-mobile-screen",
			"searchTerms": ["android", "call", "cell phone", "device", "number", "screen", "telephone", "text"]
		},
		{
			"title": "fa-solid fa-mobile-screen-button",
			"searchTerms": ["apple", "call", "cell phone", "device", "iphone", "number", "screen", "telephone"]
		},
		{
			"title": "fa-brands fa-modx",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-monero",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-money-bill",
			"searchTerms": ["buy", "cash", "checkout", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-regular fa-money-bill-1",
			"searchTerms": ["buy", "cash", "checkout", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-regular fa-money-bill-1",
			"searchTerms": ["buy", "cash", "checkout", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-solid fa-money-bill-1-wave",
			"searchTerms": ["buy", "cash", "checkout", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-solid fa-money-bill-transfer",
			"searchTerms": ["bank", "conversion", "deposit", "money", "transfer", "withdrawal"]
		},
		{
			"title": "fa-solid fa-money-bill-trend-up",
			"searchTerms": ["bank", "bonds", "inflation", "market", "stocks", "trade"]
		},
		{
			"title": "fa-solid fa-money-bill-wave",
			"searchTerms": ["buy", "cash", "checkout", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-solid fa-money-bill-wheat",
			"searchTerms": ["agribusiness", "agriculture", "farming", "food", "livelihood", "subsidy"]
		},
		{
			"title": "fa-solid fa-money-bills",
			"searchTerms": ["atm", "cash", "money", "moolah"]
		},
		{
			"title": "fa-solid fa-money-check",
			"searchTerms": ["bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-solid fa-money-check-dollar",
			"searchTerms": ["bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase"]
		},
		{
			"title": "fa-solid fa-monument",
			"searchTerms": ["building", "historic", "landmark", "memorable"]
		},
		{
			"title": "fa-regular fa-moon",
			"searchTerms": ["Power Sleep Symbol", "contrast", "crescent", "crescent moon", "dark", "lunar", "moon", "night"]
		},
		{
			"title": "fa-regular fa-moon",
			"searchTerms": ["Power Sleep Symbol", "contrast", "crescent", "crescent moon", "dark", "lunar", "moon", "night"]
		},
		{
			"title": "fa-solid fa-mortar-pestle",
			"searchTerms": ["crush", "culinary", "grind", "medical", "mix", "pharmacy", "prescription", "spices"]
		},
		{
			"title": "fa-solid fa-mosque",
			"searchTerms": ["Muslim", "building", "islam", "landmark", "mosque", "muslim", "religion"]
		},
		{
			"title": "fa-solid fa-mosquito",
			"searchTerms": ["bite", "bug", "mosquito", "west nile"]
		},
		{
			"title": "fa-solid fa-mosquito-net",
			"searchTerms": ["bite", "malaria", "mosquito", "net"]
		},
		{
			"title": "fa-solid fa-motorcycle",
			"searchTerms": ["bike", "machine", "motorcycle", "racing", "transportation", "vehicle"]
		},
		{
			"title": "fa-solid fa-mound",
			"searchTerms": ["barrier", "hill", "pitcher", "speedbump"]
		},
		{
			"title": "fa-solid fa-mountain",
			"searchTerms": ["cold", "glacier", "hiking", "hill", "landscape", "mountain", "snow", "snow-capped mountain", "travel", "view"]
		},
		{
			"title": "fa-solid fa-mountain-city",
			"searchTerms": ["location", "rural", "urban"]
		},
		{
			"title": "fa-solid fa-mountain-sun",
			"searchTerms": ["country", "hiking", "landscape", "rural", "travel", "view"]
		},
		{
			"title": "fa-solid fa-mug-hot",
			"searchTerms": ["beverage", "caliente", "cocoa", "coffee", "cup", "drink", "holiday", "hot", "hot beverage", "hot chocolate", "steam", "steaming", "tea", "warmth"]
		},
		{
			"title": "fa-solid fa-mug-saucer",
			"searchTerms": ["beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea"]
		},
		{
			"title": "fa-solid fa-music",
			"searchTerms": ["lyrics", "melody", "music", "musical note", "note", "sing", "sound"]
		},
		{
			"title": "fa-solid fa-n",
			"searchTerms": ["Latin Capital Letter N", "Latin Small Letter N", "letter", "nay", "no"]
		},
		{
			"title": "fa-solid fa-naira-sign",
			"searchTerms": ["Naira Sign", "currency"]
		},
		{
			"title": "fa-brands fa-napster",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-neos",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-network-wired",
			"searchTerms": ["computer", "connect", "ethernet", "internet", "intranet"]
		},
		{
			"title": "fa-solid fa-neuter",
			"searchTerms": ["Neuter", "gender"]
		},
		{
			"title": "fa-regular fa-newspaper",
			"searchTerms": ["article", "editorial", "headline", "journal", "journalism", "news", "newspaper", "paper", "press"]
		},
		{
			"title": "fa-regular fa-newspaper",
			"searchTerms": ["article", "editorial", "headline", "journal", "journalism", "news", "newspaper", "paper", "press"]
		},
		{
			"title": "fa-brands fa-nfc-directional",
			"searchTerms": ["connect", "data", "near field communication", "nfc", "scan", "signal", "transfer", "wireless"]
		},
		{
			"title": "fa-brands fa-nfc-symbol",
			"searchTerms": ["connect", "data", "near field communication", "nfc", "scan", "signal", "transfer", "wireless"]
		},
		{
			"title": "fa-brands fa-nimblr",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-node",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-node-js",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-not-equal",
			"searchTerms": ["arithmetic", "compare", "math"]
		},
		{
			"title": "fa-solid fa-notdef",
			"searchTerms": ["close", "missing"]
		},
		{
			"title": "fa-regular fa-note-sticky",
			"searchTerms": ["message", "note", "paper", "reminder", "sticker"]
		},
		{
			"title": "fa-regular fa-note-sticky",
			"searchTerms": ["message", "note", "paper", "reminder", "sticker"]
		},
		{
			"title": "fa-solid fa-notes-medical",
			"searchTerms": ["clipboard", "doctor", "ehr", "health", "history", "records"]
		},
		{
			"title": "fa-brands fa-npm",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-ns8",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-nutritionix",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-o",
			"searchTerms": ["Latin Capital Letter O", "Latin Small Letter O", "letter"]
		},
		{
			"title": "fa-regular fa-object-group",
			"searchTerms": ["combine", "copy", "design", "merge", "select"]
		},
		{
			"title": "fa-regular fa-object-group",
			"searchTerms": ["combine", "copy", "design", "merge", "select"]
		},
		{
			"title": "fa-regular fa-object-ungroup",
			"searchTerms": ["copy", "design", "merge", "select", "separate"]
		},
		{
			"title": "fa-regular fa-object-ungroup",
			"searchTerms": ["copy", "design", "merge", "select", "separate"]
		},
		{
			"title": "fa-brands fa-octopus-deploy",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-odnoklassniki",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-odysee",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-oil-can",
			"searchTerms": ["auto", "crude", "gasoline", "grease", "lubricate", "petroleum"]
		},
		{
			"title": "fa-solid fa-oil-well",
			"searchTerms": ["drill", "oil", "rig"]
		},
		{
			"title": "fa-brands fa-old-republic",
			"searchTerms": ["politics", "star wars"]
		},
		{
			"title": "fa-solid fa-om",
			"searchTerms": ["Hindu", "buddhism", "hinduism", "jainism", "mantra", "om", "religion"]
		},
		{
			"title": "fa-brands fa-opencart",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-openid",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-opera",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-optin-monster",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-orcid",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-osi",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-otter",
			"searchTerms": ["animal", "badger", "fauna", "fishing", "fur", "mammal", "marten", "otter", "playful"]
		},
		{
			"title": "fa-solid fa-outdent",
			"searchTerms": ["align", "justify", "paragraph", "tab"]
		},
		{
			"title": "fa-solid fa-p",
			"searchTerms": ["Latin Capital Letter P", "Latin Small Letter P", "letter"]
		},
		{
			"title": "fa-brands fa-padlet",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-page4",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-pagelines",
			"searchTerms": ["eco", "flora", "leaf", "leaves", "nature", "plant", "tree"]
		},
		{
			"title": "fa-solid fa-pager",
			"searchTerms": ["beeper", "cell phone", "communication", "page", "pager"]
		},
		{
			"title": "fa-solid fa-paint-roller",
			"searchTerms": ["acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor"]
		},
		{
			"title": "fa-solid fa-paintbrush",
			"searchTerms": ["acrylic", "art", "brush", "color", "fill", "paint", "paintbrush", "painting", "pigment", "watercolor"]
		},
		{
			"title": "fa-solid fa-palette",
			"searchTerms": ["acrylic", "art", "artist palette", "brush", "color", "fill", "museum", "paint", "painting", "palette", "pigment", "watercolor"]
		},
		{
			"title": "fa-brands fa-palfed",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-pallet",
			"searchTerms": ["archive", "box", "inventory", "shipping", "warehouse"]
		},
		{
			"title": "fa-solid fa-panorama",
			"searchTerms": ["image", "landscape", "photo", "wide"]
		},
		{
			"title": "fa-regular fa-paper-plane",
			"searchTerms": ["air", "float", "fold", "mail", "paper", "send"]
		},
		{
			"title": "fa-regular fa-paper-plane",
			"searchTerms": ["air", "float", "fold", "mail", "paper", "send"]
		},
		{
			"title": "fa-solid fa-paperclip",
			"searchTerms": ["attach", "attachment", "connect", "link", "papercli", "paperclip"]
		},
		{
			"title": "fa-solid fa-parachute-box",
			"searchTerms": ["aid", "assistance", "goods", "relief", "rescue", "supplies"]
		},
		{
			"title": "fa-solid fa-paragraph",
			"searchTerms": ["Pilcrow Sign", "edit", "format", "text", "writing"]
		},
		{
			"title": "fa-solid fa-passport",
			"searchTerms": ["document", "id", "identification", "issued", "travel"]
		},
		{
			"title": "fa-regular fa-paste",
			"searchTerms": ["clipboard", "copy", "document", "paper"]
		},
		{
			"title": "fa-regular fa-paste",
			"searchTerms": ["clipboard", "copy", "document", "paper"]
		},
		{
			"title": "fa-brands fa-patreon",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-pause",
			"searchTerms": ["bar", "double", "hold", "pause", "pause button", "vertical", "wait"]
		},
		{
			"title": "fa-solid fa-paw",
			"searchTerms": ["animal", "cat", "dog", "pet", "print"]
		},
		{
			"title": "fa-brands fa-paypal",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-peace",
			"searchTerms": ["peace", "peace symbol", "serenity", "tranquility", "truce", "war"]
		},
		{
			"title": "fa-solid fa-pen",
			"searchTerms": ["ballpoint", "design", "edit", "pen", "update", "write"]
		},
		{
			"title": "fa-solid fa-pen-clip",
			"searchTerms": ["design", "edit", "update", "write"]
		},
		{
			"title": "fa-solid fa-pen-fancy",
			"searchTerms": ["black nib", "design", "edit", "fountain", "fountain pen", "nib", "pen", "update", "write"]
		},
		{
			"title": "fa-solid fa-pen-nib",
			"searchTerms": ["design", "edit", "fountain pen", "update", "write"]
		},
		{
			"title": "fa-solid fa-pen-ruler",
			"searchTerms": ["design", "draft", "draw", "pencil"]
		},
		{
			"title": "fa-regular fa-pen-to-square",
			"searchTerms": ["edit", "pen", "pencil", "update", "write"]
		},
		{
			"title": "fa-regular fa-pen-to-square",
			"searchTerms": ["edit", "pen", "pencil", "update", "write"]
		},
		{
			"title": "fa-solid fa-pencil",
			"searchTerms": ["Lower Left Pencil", "design", "draw", "edit", "lead", "pencil", "update", "write"]
		},
		{
			"title": "fa-solid fa-people-arrows",
			"searchTerms": ["distance", "isolation", "separate", "social distancing", "users-people"]
		},
		{
			"title": "fa-solid fa-people-carry-box",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-people-group",
			"searchTerms": ["family", "group", "team"]
		},
		{
			"title": "fa-solid fa-people-line",
			"searchTerms": ["group", "need"]
		},
		{
			"title": "fa-solid fa-people-pulling",
			"searchTerms": ["forced return", "yanking"]
		},
		{
			"title": "fa-solid fa-people-robbery",
			"searchTerms": ["criminal", "hands up", "looting", "robbery", "steal"]
		},
		{
			"title": "fa-solid fa-people-roof",
			"searchTerms": ["family", "group", "manage", "people", "safe", "shelter"]
		},
		{
			"title": "fa-solid fa-pepper-hot",
			"searchTerms": ["buffalo wings", "capsicum", "chili", "chilli", "habanero", "hot", "hot pepper", "jalapeno", "mexican", "pepper", "spicy", "tabasco", "vegetable"]
		},
		{
			"title": "fa-brands fa-perbyte",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-percent",
			"searchTerms": ["Percent Sign", "discount", "fraction", "proportion", "rate", "ratio"]
		},
		{
			"title": "fa-brands fa-periscope",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-person",
			"searchTerms": ["man", "person standing", "stand", "standing", "woman"]
		},
		{
			"title": "fa-solid fa-person-arrow-down-to-line",
			"searchTerms": ["ground", "indigenous", "native"]
		},
		{
			"title": "fa-solid fa-person-arrow-up-from-line",
			"searchTerms": ["population", "rise"]
		},
		{
			"title": "fa-solid fa-person-biking",
			"searchTerms": ["bicycle", "bike", "biking", "cyclist", "pedal", "person biking", "summer", "wheel"]
		},
		{
			"title": "fa-solid fa-person-booth",
			"searchTerms": ["changing room", "curtain", "vote", "voting"]
		},
		{
			"title": "fa-solid fa-person-breastfeeding",
			"searchTerms": ["baby", "child", "infant", "mother", "nutrition", "sustenance"]
		},
		{
			"title": "fa-solid fa-person-burst",
			"searchTerms": ["abuse", "accident", "crash", "explode", "violence"]
		},
		{
			"title": "fa-solid fa-person-cane",
			"searchTerms": ["aging", "cane", "elderly", "old", "staff"]
		},
		{
			"title": "fa-solid fa-person-chalkboard",
			"searchTerms": ["blackboard", "instructor", "keynote", "lesson", "presentation", "teacher"]
		},
		{
			"title": "fa-solid fa-person-circle-check",
			"searchTerms": ["approved", "not affected", "ok", "okay"]
		},
		{
			"title": "fa-solid fa-person-circle-exclamation",
			"searchTerms": ["affected", "alert", "lost", "missing"]
		},
		{
			"title": "fa-solid fa-person-circle-minus",
			"searchTerms": ["delete", "remove"]
		},
		{
			"title": "fa-solid fa-person-circle-plus",
			"searchTerms": ["add", "found"]
		},
		{
			"title": "fa-solid fa-person-circle-question",
			"searchTerms": ["lost", "missing"]
		},
		{
			"title": "fa-solid fa-person-circle-xmark",
			"searchTerms": ["dead", "removed"]
		},
		{
			"title": "fa-solid fa-person-digging",
			"searchTerms": ["bury", "construction", "debris", "dig", "men at work"]
		},
		{
			"title": "fa-solid fa-person-dots-from-line",
			"searchTerms": ["allergy", "diagnosis"]
		},
		{
			"title": "fa-solid fa-person-dress",
			"searchTerms": ["man", "skirt", "woman"]
		},
		{
			"title": "fa-solid fa-person-dress-burst",
			"searchTerms": ["abuse", "accident", "crash", "explode", "violence"]
		},
		{
			"title": "fa-solid fa-person-drowning",
			"searchTerms": ["drown", "emergency", "swim"]
		},
		{
			"title": "fa-solid fa-person-falling",
			"searchTerms": ["accident", "fall", "trip"]
		},
		{
			"title": "fa-solid fa-person-falling-burst",
			"searchTerms": ["accident", "crash", "death", "fall", "homicide", "murder"]
		},
		{
			"title": "fa-solid fa-person-half-dress",
			"searchTerms": ["gender", "man", "restroom", "transgender", "woman"]
		},
		{
			"title": "fa-solid fa-person-harassing",
			"searchTerms": ["abuse", "scream", "shame", "shout", "yell"]
		},
		{
			"title": "fa-solid fa-person-hiking",
			"searchTerms": ["autumn", "fall", "hike", "mountain", "outdoors", "summer", "walk"]
		},
		{
			"title": "fa-solid fa-person-military-pointing",
			"searchTerms": ["army", "customs", "guard"]
		},
		{
			"title": "fa-solid fa-person-military-rifle",
			"searchTerms": ["armed forces", "army", "military", "rifle", "war"]
		},
		{
			"title": "fa-solid fa-person-military-to-person",
			"searchTerms": ["civilian", "coordination", "military"]
		},
		{
			"title": "fa-solid fa-person-praying",
			"searchTerms": ["kneel", "place of worship", "religion", "thank", "worship"]
		},
		{
			"title": "fa-solid fa-person-pregnant",
			"searchTerms": ["baby", "birth", "child", "pregnant", "pregnant woman", "woman"]
		},
		{
			"title": "fa-solid fa-person-rays",
			"searchTerms": ["affected", "focus", "shine"]
		},
		{
			"title": "fa-solid fa-person-rifle",
			"searchTerms": ["army", "combatant", "gun", "military", "rifle", "war"]
		},
		{
			"title": "fa-solid fa-person-running",
			"searchTerms": ["exit", "flee", "marathon", "person running", "race", "running"]
		},
		{
			"title": "fa-solid fa-person-shelter",
			"searchTerms": ["house", "inside", "roof", "safe", "safety", "shelter"]
		},
		{
			"title": "fa-solid fa-person-skating",
			"searchTerms": ["figure skating", "ice", "olympics", "rink", "skate", "winter"]
		},
		{
			"title": "fa-solid fa-person-skiing",
			"searchTerms": ["downhill", "olympics", "ski", "skier", "snow", "winter"]
		},
		{
			"title": "fa-solid fa-person-skiing-nordic",
			"searchTerms": ["cross country", "olympics", "winter"]
		},
		{
			"title": "fa-solid fa-person-snowboarding",
			"searchTerms": ["olympics", "ski", "snow", "snowboard", "snowboarder", "winter"]
		},
		{
			"title": "fa-solid fa-person-swimming",
			"searchTerms": ["ocean", "person swimming", "pool", "sea", "swim", "water"]
		},
		{
			"title": "fa-solid fa-person-through-window",
			"searchTerms": ["door", "exit", "forced entry", "leave", "robbery", "steal", "window"]
		},
		{
			"title": "fa-solid fa-person-walking",
			"searchTerms": ["crosswalk", "exercise", "hike", "move", "person walking", "walk", "walking"]
		},
		{
			"title": "fa-solid fa-person-walking-arrow-loop-left",
			"searchTerms": ["population return", "return"]
		},
		{
			"title": "fa-solid fa-person-walking-arrow-right",
			"searchTerms": ["exit", "internally displaced", "leave", "refugee"]
		},
		{
			"title": "fa-solid fa-person-walking-dashed-line-arrow-right",
			"searchTerms": ["exit", "refugee"]
		},
		{
			"title": "fa-solid fa-person-walking-luggage",
			"searchTerms": ["bag", "baggage", "briefcase", "carry-on", "deployment", "rolling"]
		},
		{
			"title": "fa-solid fa-person-walking-with-cane",
			"searchTerms": ["blind", "cane"]
		},
		{
			"title": "fa-solid fa-peseta-sign",
			"searchTerms": ["Peseta Sign", "currency"]
		},
		{
			"title": "fa-solid fa-peso-sign",
			"searchTerms": ["Peso Sign", "currency"]
		},
		{
			"title": "fa-brands fa-phabricator",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-phoenix-framework",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-phoenix-squadron",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-phone",
			"searchTerms": ["Left Hand Telephone Receiver", "call", "earphone", "number", "phone", "receiver", "support", "telephone", "telephone receiver", "voice"]
		},
		{
			"title": "fa-solid fa-phone-flip",
			"searchTerms": ["Right Hand Telephone Receiver", "call", "earphone", "number", "support", "telephone", "voice"]
		},
		{
			"title": "fa-solid fa-phone-slash",
			"searchTerms": ["call", "cancel", "earphone", "mute", "number", "support", "telephone", "voice"]
		},
		{
			"title": "fa-solid fa-phone-volume",
			"searchTerms": ["call", "earphone", "number", "sound", "support", "telephone", "voice", "volume-control-phone"]
		},
		{
			"title": "fa-solid fa-photo-film",
			"searchTerms": ["av", "film", "image", "library", "media"]
		},
		{
			"title": "fa-brands fa-php",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-pied-piper",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-pied-piper-alt",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-pied-piper-hat",
			"searchTerms": ["clothing"]
		},
		{
			"title": "fa-brands fa-pied-piper-pp",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-piggy-bank",
			"searchTerms": ["bank", "save", "savings"]
		},
		{
			"title": "fa-solid fa-pills",
			"searchTerms": ["drugs", "medicine", "prescription", "tablets"]
		},
		{
			"title": "fa-brands fa-pinterest",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-pinterest-p",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-pix",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-pizza-slice",
			"searchTerms": ["cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato"]
		},
		{
			"title": "fa-solid fa-place-of-worship",
			"searchTerms": ["building", "church", "holy", "mosque", "synagogue"]
		},
		{
			"title": "fa-solid fa-plane",
			"searchTerms": ["airplane", "airport", "destination", "fly", "location", "mode", "travel", "trip"]
		},
		{
			"title": "fa-solid fa-plane-arrival",
			"searchTerms": ["aeroplane", "airplane", "airplane arrival", "airport", "arrivals", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip"]
		},
		{
			"title": "fa-solid fa-plane-circle-check",
			"searchTerms": ["airplane", "airport", "flight", "fly", "not affected", "ok", "okay", "travel"]
		},
		{
			"title": "fa-solid fa-plane-circle-exclamation",
			"searchTerms": ["affected", "airplane", "airport", "flight", "fly", "travel"]
		},
		{
			"title": "fa-solid fa-plane-circle-xmark",
			"searchTerms": ["airplane", "airport", "destroy", "flight", "fly", "travel"]
		},
		{
			"title": "fa-solid fa-plane-departure",
			"searchTerms": ["aeroplane", "airplane", "airplane departure", "airport", "check-in", "departing", "departure", "departures", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip"]
		},
		{
			"title": "fa-solid fa-plane-lock",
			"searchTerms": ["airplane", "airport", "closed", "flight", "fly", "lockdown", "quarantine", "travel"]
		},
		{
			"title": "fa-solid fa-plane-slash",
			"searchTerms": ["airplane mode", "airport", "canceled", "covid-19", "delayed", "grounded", "travel"]
		},
		{
			"title": "fa-solid fa-plane-up",
			"searchTerms": ["airplane", "airport", "internet", "signal", "sky", "wifi", "wireless"]
		},
		{
			"title": "fa-solid fa-plant-wilt",
			"searchTerms": ["drought", "planting", "vegetation", "wilt"]
		},
		{
			"title": "fa-solid fa-plate-wheat",
			"searchTerms": ["bowl", "hunger", "rations", "wheat"]
		},
		{
			"title": "fa-solid fa-play",
			"searchTerms": ["arrow", "audio", "music", "play", "play button", "playing", "right", "sound", "start", "triangle", "video"]
		},
		{
			"title": "fa-brands fa-playstation",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-plug",
			"searchTerms": ["connect", "electric", "electric plug", "electricity", "online", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plug-circle-bolt",
			"searchTerms": ["electric", "electricity", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plug-circle-check",
			"searchTerms": ["electric", "electricity", "not affected", "ok", "okay", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plug-circle-exclamation",
			"searchTerms": ["affected", "electric", "electricity", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plug-circle-minus",
			"searchTerms": ["electric", "electricity", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plug-circle-plus",
			"searchTerms": ["electric", "electricity", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plug-circle-xmark",
			"searchTerms": ["destroy", "electric", "electricity", "outage", "plug", "power"]
		},
		{
			"title": "fa-solid fa-plus",
			"searchTerms": ["+", "Plus Sign", "add", "create", "expand", "math", "new", "plus", "positive", "shape", "sign"]
		},
		{
			"title": "fa-solid fa-plus-minus",
			"searchTerms": ["Plus-Minus Sign", "add", "math", "subtract"]
		},
		{
			"title": "fa-solid fa-podcast",
			"searchTerms": ["audio", "broadcast", "music", "sound"]
		},
		{
			"title": "fa-solid fa-poo",
			"searchTerms": ["crap", "dung", "face", "monster", "pile of poo", "poo", "poop", "shit", "smile", "turd"]
		},
		{
			"title": "fa-solid fa-poo-storm",
			"searchTerms": ["bolt", "cloud", "euphemism", "lightning", "mess", "poop", "shit", "turd"]
		},
		{
			"title": "fa-solid fa-poop",
			"searchTerms": ["crap", "poop", "shit", "smile", "turd"]
		},
		{
			"title": "fa-solid fa-power-off",
			"searchTerms": ["Power Symbol", "cancel", "computer", "on", "reboot", "restart"]
		},
		{
			"title": "fa-solid fa-prescription",
			"searchTerms": ["drugs", "medical", "medicine", "pharmacy", "rx"]
		},
		{
			"title": "fa-solid fa-prescription-bottle",
			"searchTerms": ["drugs", "medical", "medicine", "pharmacy", "rx"]
		},
		{
			"title": "fa-solid fa-prescription-bottle-medical",
			"searchTerms": ["drugs", "medical", "medicine", "pharmacy", "rx"]
		},
		{
			"title": "fa-solid fa-print",
			"searchTerms": ["Print Screen Symbol", "Printer Icon", "business", "computer", "copy", "document", "office", "paper", "printer"]
		},
		{
			"title": "fa-brands fa-product-hunt",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-pump-medical",
			"searchTerms": ["anti-bacterial", "clean", "covid-19", "disinfect", "hygiene", "medical grade", "sanitizer", "soap"]
		},
		{
			"title": "fa-solid fa-pump-soap",
			"searchTerms": ["anti-bacterial", "clean", "covid-19", "disinfect", "hygiene", "sanitizer", "soap"]
		},
		{
			"title": "fa-brands fa-pushed",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-puzzle-piece",
			"searchTerms": ["add-on", "addon", "clue", "game", "interlocking", "jigsaw", "piece", "puzzle", "puzzle piece", "section"]
		},
		{
			"title": "fa-brands fa-python",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-q",
			"searchTerms": ["Latin Capital Letter Q", "Latin Small Letter Q", "letter"]
		},
		{
			"title": "fa-brands fa-qq",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-qrcode",
			"searchTerms": ["barcode", "info", "information", "scan"]
		},
		{
			"title": "fa-solid fa-question",
			"searchTerms": ["?", "Question Mark", "help", "information", "mark", "outlined", "punctuation", "question", "red question mark", "support", "unknown", "white question mark"]
		},
		{
			"title": "fa-brands fa-quinscape",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-quora",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-quote-left",
			"searchTerms": ["Left Double Quotation Mark", "mention", "note", "phrase", "text", "type"]
		},
		{
			"title": "fa-solid fa-quote-right",
			"searchTerms": ["Right Double Quotation Mark", "mention", "note", "phrase", "text", "type"]
		},
		{
			"title": "fa-solid fa-r",
			"searchTerms": ["Latin Capital Letter R", "Latin Small Letter R", "letter"]
		},
		{
			"title": "fa-brands fa-r-project",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-radiation",
			"searchTerms": ["danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning"]
		},
		{
			"title": "fa-solid fa-radio",
			"searchTerms": ["am", "broadcast", "fm", "frequency", "music", "news", "radio", "receiver", "transmitter", "tuner", "video"]
		},
		{
			"title": "fa-solid fa-rainbow",
			"searchTerms": ["gold", "leprechaun", "prism", "rain", "rainbow", "sky"]
		},
		{
			"title": "fa-solid fa-ranking-star",
			"searchTerms": ["chart", "first place", "podium", "rank", "win"]
		},
		{
			"title": "fa-brands fa-raspberry-pi",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-ravelry",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-react",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-reacteurope",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-readme",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-rebel",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-receipt",
			"searchTerms": ["accounting", "bookkeeping", "check", "evidence", "invoice", "money", "pay", "proof", "receipt", "table"]
		},
		{
			"title": "fa-solid fa-record-vinyl",
			"searchTerms": ["LP", "album", "analog", "music", "phonograph", "sound"]
		},
		{
			"title": "fa-solid fa-rectangle-ad",
			"searchTerms": ["advertisement", "media", "newspaper", "promotion", "publicity"]
		},
		{
			"title": "fa-regular fa-rectangle-list",
			"searchTerms": ["checklist", "completed", "done", "finished", "ol", "todo", "ul"]
		},
		{
			"title": "fa-regular fa-rectangle-list",
			"searchTerms": ["checklist", "completed", "done", "finished", "ol", "todo", "ul"]
		},
		{
			"title": "fa-regular fa-rectangle-xmark",
			"searchTerms": ["browser", "cancel", "computer", "development"]
		},
		{
			"title": "fa-regular fa-rectangle-xmark",
			"searchTerms": ["browser", "cancel", "computer", "development"]
		},
		{
			"title": "fa-solid fa-recycle",
			"searchTerms": ["Recycling Symbol For Generic Materials", "Universal Recycling Symbol", "Waste", "compost", "garbage", "recycle", "recycling symbol", "reuse", "trash"]
		},
		{
			"title": "fa-brands fa-red-river",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-reddit",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-reddit-alien",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-redhat",
			"searchTerms": ["linux", "operating system", "os"]
		},
		{
			"title": "fa-regular fa-registered",
			"searchTerms": ["copyright", "mark", "r", "registered", "trademark"]
		},
		{
			"title": "fa-regular fa-registered",
			"searchTerms": ["copyright", "mark", "r", "registered", "trademark"]
		},
		{
			"title": "fa-brands fa-renren",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-repeat",
			"searchTerms": ["arrow", "clockwise", "flip", "reload", "repeat", "repeat button", "rewind", "switch"]
		},
		{
			"title": "fa-solid fa-reply",
			"searchTerms": ["mail", "message", "respond"]
		},
		{
			"title": "fa-solid fa-reply-all",
			"searchTerms": ["mail", "message", "respond"]
		},
		{
			"title": "fa-brands fa-replyd",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-republican",
			"searchTerms": ["american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa"]
		},
		{
			"title": "fa-brands fa-researchgate",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-resolving",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-restroom",
			"searchTerms": ["bathroom", "toilet", "water closet", "wc"]
		},
		{
			"title": "fa-solid fa-retweet",
			"searchTerms": ["refresh", "reload", "share", "swap"]
		},
		{
			"title": "fa-brands fa-rev",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-ribbon",
			"searchTerms": ["badge", "cause", "celebration", "lapel", "pin", "reminder", "reminder ribbon", "ribbon"]
		},
		{
			"title": "fa-solid fa-right-from-bracket",
			"searchTerms": ["arrow", "exit", "leave", "log out", "logout", "sign-out"]
		},
		{
			"title": "fa-solid fa-right-left",
			"searchTerms": ["arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer"]
		},
		{
			"title": "fa-solid fa-right-long",
			"searchTerms": ["forward", "long-arrow-right", "next"]
		},
		{
			"title": "fa-solid fa-right-to-bracket",
			"searchTerms": ["arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup"]
		},
		{
			"title": "fa-solid fa-ring",
			"searchTerms": ["Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "engagement", "fantasy", "gold", "jewelry", "marriage", "precious"]
		},
		{
			"title": "fa-solid fa-road",
			"searchTerms": ["highway", "map", "motorway", "pavement", "road", "route", "street", "travel"]
		},
		{
			"title": "fa-solid fa-road-barrier",
			"searchTerms": ["block", "border", "no entry", "roadblock"]
		},
		{
			"title": "fa-solid fa-road-bridge",
			"searchTerms": ["bridge", "infrastructure", "road", "travel"]
		},
		{
			"title": "fa-solid fa-road-circle-check",
			"searchTerms": ["freeway", "highway", "not affected", "ok", "okay", "pavement", "road"]
		},
		{
			"title": "fa-solid fa-road-circle-exclamation",
			"searchTerms": ["affected", "freeway", "highway", "pavement", "road"]
		},
		{
			"title": "fa-solid fa-road-circle-xmark",
			"searchTerms": ["destroy", "freeway", "highway", "pavement", "road"]
		},
		{
			"title": "fa-solid fa-road-lock",
			"searchTerms": ["closed", "freeway", "highway", "lockdown", "pavement", "quarantine", "road"]
		},
		{
			"title": "fa-solid fa-road-spikes",
			"searchTerms": ["barrier", "roadblock", "spikes"]
		},
		{
			"title": "fa-solid fa-robot",
			"searchTerms": ["android", "automate", "computer", "cyborg", "face", "monster", "robot"]
		},
		{
			"title": "fa-solid fa-rocket",
			"searchTerms": ["aircraft", "app", "jet", "launch", "nasa", "space"]
		},
		{
			"title": "fa-brands fa-rocketchat",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-rockrms",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-rotate",
			"searchTerms": ["anticlockwise", "arrow", "counterclockwise", "counterclockwise arrows button", "exchange", "refresh", "reload", "rotate", "swap", "withershins"]
		},
		{
			"title": "fa-solid fa-rotate-left",
			"searchTerms": ["back", "control z", "exchange", "oops", "return", "swap"]
		},
		{
			"title": "fa-solid fa-rotate-right",
			"searchTerms": ["forward", "refresh", "reload", "repeat"]
		},
		{
			"title": "fa-solid fa-route",
			"searchTerms": ["directions", "navigation", "travel"]
		},
		{
			"title": "fa-solid fa-rss",
			"searchTerms": ["blog", "feed", "journal", "news", "writing"]
		},
		{
			"title": "fa-solid fa-ruble-sign",
			"searchTerms": ["Ruble Sign", "currency"]
		},
		{
			"title": "fa-solid fa-rug",
			"searchTerms": ["blanket", "carpet", "rug", "textile"]
		},
		{
			"title": "fa-solid fa-ruler",
			"searchTerms": ["design", "draft", "length", "measure", "planning", "ruler", "straight edge", "straight ruler"]
		},
		{
			"title": "fa-solid fa-ruler-combined",
			"searchTerms": ["design", "draft", "length", "measure", "planning"]
		},
		{
			"title": "fa-solid fa-ruler-horizontal",
			"searchTerms": ["design", "draft", "length", "measure", "planning"]
		},
		{
			"title": "fa-solid fa-ruler-vertical",
			"searchTerms": ["design", "draft", "length", "measure", "planning"]
		},
		{
			"title": "fa-solid fa-rupee-sign",
			"searchTerms": ["Rupee Sign", "currency"]
		},
		{
			"title": "fa-solid fa-rupiah-sign",
			"searchTerms": ["currency"]
		},
		{
			"title": "fa-brands fa-rust",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-s",
			"searchTerms": ["Latin Capital Letter S", "Latin Small Letter S", "letter"]
		},
		{
			"title": "fa-solid fa-sack-dollar",
			"searchTerms": ["bag", "burlap", "cash", "dollar", "money", "money bag", "moneybag", "robber", "santa", "usd"]
		},
		{
			"title": "fa-solid fa-sack-xmark",
			"searchTerms": ["bag", "burlap", "rations"]
		},
		{
			"title": "fa-brands fa-safari",
			"searchTerms": ["browser"]
		},
		{
			"title": "fa-solid fa-sailboat",
			"searchTerms": ["dinghy", "mast", "sailboat", "sailing", "yacht"]
		},
		{
			"title": "fa-brands fa-salesforce",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-sass",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-satellite",
			"searchTerms": ["communications", "hardware", "orbit", "satellite", "space"]
		},
		{
			"title": "fa-solid fa-satellite-dish",
			"searchTerms": ["SETI", "antenna", "communications", "dish", "hardware", "radar", "receiver", "satellite", "satellite antenna", "saucer", "signal", "space"]
		},
		{
			"title": "fa-solid fa-scale-balanced",
			"searchTerms": ["Libra", "balance", "balance scale", "balanced", "justice", "law", "legal", "measure", "rule", "scale", "weight", "zodiac"]
		},
		{
			"title": "fa-solid fa-scale-unbalanced",
			"searchTerms": ["justice", "legal", "measure", "unbalanced", "weight"]
		},
		{
			"title": "fa-solid fa-scale-unbalanced-flip",
			"searchTerms": ["justice", "legal", "measure", "unbalanced", "weight"]
		},
		{
			"title": "fa-brands fa-schlix",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-school",
			"searchTerms": ["building", "education", "learn", "school", "student", "teacher"]
		},
		{
			"title": "fa-solid fa-school-circle-check",
			"searchTerms": ["not affected", "ok", "okay", "schoolhouse"]
		},
		{
			"title": "fa-solid fa-school-circle-exclamation",
			"searchTerms": ["affected", "schoolhouse"]
		},
		{
			"title": "fa-solid fa-school-circle-xmark",
			"searchTerms": ["destroy", "schoolhouse"]
		},
		{
			"title": "fa-solid fa-school-flag",
			"searchTerms": ["educate", "flag", "school", "schoolhouse"]
		},
		{
			"title": "fa-solid fa-school-lock",
			"searchTerms": ["closed", "lockdown", "quarantine", "schoolhouse"]
		},
		{
			"title": "fa-solid fa-scissors",
			"searchTerms": ["Black Safety Scissors", "White Scissors", "clip", "cutting", "scissors", "snip", "tool"]
		},
		{
			"title": "fa-brands fa-screenpal",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-screwdriver",
			"searchTerms": ["admin", "fix", "mechanic", "repair", "screw", "screwdriver", "settings", "tool"]
		},
		{
			"title": "fa-solid fa-screwdriver-wrench",
			"searchTerms": ["admin", "fix", "repair", "screwdriver", "settings", "tools", "wrench"]
		},
		{
			"title": "fa-brands fa-scribd",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-scroll",
			"searchTerms": ["Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper", "script", "scroll"]
		},
		{
			"title": "fa-solid fa-scroll-torah",
			"searchTerms": ["book", "jewish", "judaism", "religion", "scroll"]
		},
		{
			"title": "fa-solid fa-sd-card",
			"searchTerms": ["image", "memory", "photo", "save"]
		},
		{
			"title": "fa-brands fa-searchengin",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-section",
			"searchTerms": ["Section Sign", "law", "legal", "silcrow"]
		},
		{
			"title": "fa-solid fa-seedling",
			"searchTerms": ["environment", "flora", "grow", "plant", "sapling", "seedling", "vegan", "young"]
		},
		{
			"title": "fa-brands fa-sellcast",
			"searchTerms": ["eercast"]
		},
		{
			"title": "fa-brands fa-sellsy",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-server",
			"searchTerms": ["computer", "cpu", "database", "hardware", "network"]
		},
		{
			"title": "fa-brands fa-servicestack",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-shapes",
			"searchTerms": ["blocks", "build", "circle", "square", "triangle"]
		},
		{
			"title": "fa-solid fa-share",
			"searchTerms": ["forward", "save", "send", "social"]
		},
		{
			"title": "fa-regular fa-share-from-square",
			"searchTerms": ["forward", "save", "send", "social"]
		},
		{
			"title": "fa-regular fa-share-from-square",
			"searchTerms": ["forward", "save", "send", "social"]
		},
		{
			"title": "fa-solid fa-share-nodes",
			"searchTerms": ["forward", "save", "send", "social"]
		},
		{
			"title": "fa-solid fa-sheet-plastic",
			"searchTerms": ["plastic", "plastic wrap", "protect", "tarp", "tarpaulin", "waterproof"]
		},
		{
			"title": "fa-solid fa-shekel-sign",
			"searchTerms": ["New Sheqel Sign", "currency", "ils", "money"]
		},
		{
			"title": "fa-solid fa-shield",
			"searchTerms": ["achievement", "armor", "award", "block", "cleric", "defend", "defense", "holy", "paladin", "protect", "safety", "security", "shield", "weapon", "winner"]
		},
		{
			"title": "fa-solid fa-shield-cat",
			"searchTerms": ["animal", "feline", "pet", "protect", "safety", "veterinary"]
		},
		{
			"title": "fa-solid fa-shield-dog",
			"searchTerms": ["animal", "canine", "pet", "protect", "safety", "veterinary"]
		},
		{
			"title": "fa-solid fa-shield-halved",
			"searchTerms": ["achievement", "armor", "award", "block", "cleric", "defend", "defense", "holy", "paladin", "security", "shield", "weapon", "winner"]
		},
		{
			"title": "fa-solid fa-shield-heart",
			"searchTerms": ["love", "protect", "safe", "safety", "shield"]
		},
		{
			"title": "fa-solid fa-shield-virus",
			"searchTerms": ["antibodies", "barrier", "coronavirus", "covid-19", "flu", "health", "infection", "pandemic", "protect", "safety", "vaccine"]
		},
		{
			"title": "fa-solid fa-ship",
			"searchTerms": ["boat", "passenger", "sea", "ship", "water"]
		},
		{
			"title": "fa-solid fa-shirt",
			"searchTerms": ["clothing", "fashion", "garment", "shirt", "short sleeve", "t-shirt", "tshirt"]
		},
		{
			"title": "fa-brands fa-shirtsinbulk",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-shoe-prints",
			"searchTerms": ["feet", "footprints", "steps", "walk"]
		},
		{
			"title": "fa-solid fa-shop",
			"searchTerms": ["bodega", "building", "buy", "market", "purchase", "shopping", "store"]
		},
		{
			"title": "fa-solid fa-shop-lock",
			"searchTerms": ["bodega", "building", "buy", "closed", "lock", "lockdown", "market", "purchase", "quarantine", "shop", "shopping", "store"]
		},
		{
			"title": "fa-solid fa-shop-slash",
			"searchTerms": ["building", "buy", "closed", "covid-19", "purchase", "shopping"]
		},
		{
			"title": "fa-brands fa-shopify",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-shopware",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-shower",
			"searchTerms": ["bath", "clean", "faucet", "shower", "water"]
		},
		{
			"title": "fa-solid fa-shrimp",
			"searchTerms": ["allergy", "crustacean", "prawn", "seafood", "shellfish", "shrimp", "tail"]
		},
		{
			"title": "fa-solid fa-shuffle",
			"searchTerms": ["arrow", "arrows", "crossed", "shuffle", "shuffle tracks button", "sort", "swap", "switch", "transfer"]
		},
		{
			"title": "fa-solid fa-shuttle-space",
			"searchTerms": ["astronaut", "machine", "nasa", "rocket", "space", "transportation"]
		},
		{
			"title": "fa-solid fa-sign-hanging",
			"searchTerms": ["directions", "real estate", "signage", "wayfinding"]
		},
		{
			"title": "fa-solid fa-signal",
			"searchTerms": ["antenna", "antenna bars", "bar", "bars", "cell", "graph", "mobile", "online", "phone", "reception", "status"]
		},
		{
			"title": "fa-solid fa-signature",
			"searchTerms": ["John Hancock", "cursive", "name", "writing"]
		},
		{
			"title": "fa-solid fa-signs-post",
			"searchTerms": ["directions", "directory", "map", "signage", "wayfinding"]
		},
		{
			"title": "fa-solid fa-sim-card",
			"searchTerms": ["hard drive", "hardware", "portable", "storage", "technology", "tiny"]
		},
		{
			"title": "fa-brands fa-simplybuilt",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-sink",
			"searchTerms": ["bathroom", "covid-19", "faucet", "kitchen", "wash"]
		},
		{
			"title": "fa-brands fa-sistrix",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-sitemap",
			"searchTerms": ["directory", "hierarchy", "ia", "information architecture", "organization"]
		},
		{
			"title": "fa-brands fa-sith",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-sitrox",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-sketch",
			"searchTerms": ["app", "design", "interface"]
		},
		{
			"title": "fa-solid fa-skull",
			"searchTerms": ["bones", "death", "face", "fairy tale", "monster", "skeleton", "skull", "x-ray", "yorick"]
		},
		{
			"title": "fa-solid fa-skull-crossbones",
			"searchTerms": ["Black Skull and Crossbones", "Dungeons & Dragons", "alert", "bones", "crossbones", "d&d", "danger", "dangerous area", "dead", "deadly", "death", "dnd", "face", "fantasy", "halloween", "holiday", "jolly-roger", "monster", "pirate", "poison", "skeleton", "skull", "skull and crossbones", "warning"]
		},
		{
			"title": "fa-brands fa-skyatlas",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-skype",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-slack",
			"searchTerms": ["anchor", "hash", "hashtag"]
		},
		{
			"title": "fa-solid fa-slash",
			"searchTerms": ["cancel", "close", "mute", "off", "stop", "x"]
		},
		{
			"title": "fa-solid fa-sleigh",
			"searchTerms": ["christmas", "claus", "fly", "holiday", "santa", "sled", "snow", "xmas"]
		},
		{
			"title": "fa-solid fa-sliders",
			"searchTerms": ["adjust", "settings", "sliders", "toggle"]
		},
		{
			"title": "fa-brands fa-slideshare",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-smog",
			"searchTerms": ["dragon", "fog", "haze", "pollution", "smoke", "weather"]
		},
		{
			"title": "fa-solid fa-smoking",
			"searchTerms": ["cancer", "cigarette", "nicotine", "smoking", "smoking status", "tobacco"]
		},
		{
			"title": "fa-brands fa-snapchat",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-snowflake",
			"searchTerms": ["Heavy Chevron Snowflake", "cold", "precipitation", "rain", "snow", "snowfall", "snowflake", "winter"]
		},
		{
			"title": "fa-regular fa-snowflake",
			"searchTerms": ["Heavy Chevron Snowflake", "cold", "precipitation", "rain", "snow", "snowfall", "snowflake", "winter"]
		},
		{
			"title": "fa-solid fa-snowman",
			"searchTerms": ["cold", "decoration", "frost", "frosty", "holiday", "snow", "snowman", "snowman without snow"]
		},
		{
			"title": "fa-solid fa-snowplow",
			"searchTerms": ["clean up", "cold", "road", "storm", "winter"]
		},
		{
			"title": "fa-solid fa-soap",
			"searchTerms": ["bar", "bathing", "bubbles", "clean", "cleaning", "covid-19", "hygiene", "lather", "soap", "soapdish", "wash"]
		},
		{
			"title": "fa-solid fa-socks",
			"searchTerms": ["business socks", "business time", "clothing", "feet", "flight of the conchords", "socks", "stocking", "wednesday"]
		},
		{
			"title": "fa-solid fa-solar-panel",
			"searchTerms": ["clean", "eco-friendly", "energy", "green", "sun"]
		},
		{
			"title": "fa-solid fa-sort",
			"searchTerms": ["filter", "order"]
		},
		{
			"title": "fa-solid fa-sort-down",
			"searchTerms": ["arrow", "descending", "filter", "order", "sort-desc"]
		},
		{
			"title": "fa-solid fa-sort-up",
			"searchTerms": ["arrow", "ascending", "filter", "order", "sort-asc"]
		},
		{
			"title": "fa-brands fa-soundcloud",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-sourcetree",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-spa",
			"searchTerms": ["flora", "massage", "mindfulness", "plant", "wellness"]
		},
		{
			"title": "fa-brands fa-space-awesome",
			"searchTerms": ["adventure", "rocket", "ship", "shuttle"]
		},
		{
			"title": "fa-solid fa-spaghetti-monster-flying",
			"searchTerms": ["agnosticism", "atheism", "flying spaghetti monster", "fsm"]
		},
		{
			"title": "fa-brands fa-speakap",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-speaker-deck",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-spell-check",
			"searchTerms": ["dictionary", "edit", "editor", "grammar", "text"]
		},
		{
			"title": "fa-solid fa-spider",
			"searchTerms": ["arachnid", "bug", "charlotte", "crawl", "eight", "halloween", "insect", "spider"]
		},
		{
			"title": "fa-solid fa-spinner",
			"searchTerms": ["circle", "loading", "progress"]
		},
		{
			"title": "fa-solid fa-splotch",
			"searchTerms": ["Ink", "blob", "blotch", "glob", "stain"]
		},
		{
			"title": "fa-solid fa-spoon",
			"searchTerms": ["cutlery", "dining", "scoop", "silverware", "spoon", "tableware"]
		},
		{
			"title": "fa-brands fa-spotify",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-spray-can",
			"searchTerms": ["Paint", "aerosol", "design", "graffiti", "tag"]
		},
		{
			"title": "fa-solid fa-spray-can-sparkles",
			"searchTerms": ["car", "clean", "deodorize", "fresh", "pine", "scent"]
		},
		{
			"title": "fa-regular fa-square",
			"searchTerms": ["Black Square", "black medium square", "block", "box", "geometric", "shape", "square", "white medium square"]
		},
		{
			"title": "fa-regular fa-square",
			"searchTerms": ["Black Square", "black medium square", "block", "box", "geometric", "shape", "square", "white medium square"]
		},
		{
			"title": "fa-solid fa-square-arrow-up-right",
			"searchTerms": ["diagonal", "new", "open", "send", "share"]
		},
		{
			"title": "fa-brands fa-square-behance",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-square-caret-down",
			"searchTerms": ["arrow", "caret-square-o-down", "dropdown", "expand", "menu", "more", "triangle"]
		},
		{
			"title": "fa-regular fa-square-caret-down",
			"searchTerms": ["arrow", "caret-square-o-down", "dropdown", "expand", "menu", "more", "triangle"]
		},
		{
			"title": "fa-regular fa-square-caret-left",
			"searchTerms": ["arrow", "back", "caret-square-o-left", "previous", "triangle"]
		},
		{
			"title": "fa-regular fa-square-caret-left",
			"searchTerms": ["arrow", "back", "caret-square-o-left", "previous", "triangle"]
		},
		{
			"title": "fa-regular fa-square-caret-right",
			"searchTerms": ["arrow", "caret-square-o-right", "forward", "next", "triangle"]
		},
		{
			"title": "fa-regular fa-square-caret-right",
			"searchTerms": ["arrow", "caret-square-o-right", "forward", "next", "triangle"]
		},
		{
			"title": "fa-regular fa-square-caret-up",
			"searchTerms": ["arrow", "caret-square-o-up", "collapse", "triangle", "upload"]
		},
		{
			"title": "fa-regular fa-square-caret-up",
			"searchTerms": ["arrow", "caret-square-o-up", "collapse", "triangle", "upload"]
		},
		{
			"title": "fa-regular fa-square-check",
			"searchTerms": ["accept", "agree", "box", "button", "check", "check box with check", "check mark button", "checkmark", "confirm", "correct", "done", "mark", "ok", "select", "success", "tick", "todo", "yes", "✓"]
		},
		{
			"title": "fa-regular fa-square-check",
			"searchTerms": ["accept", "agree", "box", "button", "check", "check box with check", "check mark button", "checkmark", "confirm", "correct", "done", "mark", "ok", "select", "success", "tick", "todo", "yes", "✓"]
		},
		{
			"title": "fa-brands fa-square-dribbble",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-square-envelope",
			"searchTerms": ["e-mail", "email", "letter", "mail", "message", "notification", "support"]
		},
		{
			"title": "fa-brands fa-square-facebook",
			"searchTerms": ["social network"]
		},
		{
			"title": "fa-brands fa-square-font-awesome",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-font-awesome-stroke",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-square-full",
			"searchTerms": ["black large square", "block", "blue", "blue square", "box", "brown", "brown square", "geometric", "green", "green square", "orange", "orange square", "purple", "purple square", "red", "red square", "shape", "square", "white large square", "yellow", "yellow square"]
		},
		{
			"title": "fa-regular fa-square-full",
			"searchTerms": ["black large square", "block", "blue", "blue square", "box", "brown", "brown square", "geometric", "green", "green square", "orange", "orange square", "purple", "purple square", "red", "red square", "shape", "square", "white large square", "yellow", "yellow square"]
		},
		{
			"title": "fa-brands fa-square-git",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-github",
			"searchTerms": ["octocat"]
		},
		{
			"title": "fa-brands fa-square-gitlab",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-google-plus",
			"searchTerms": ["social network"]
		},
		{
			"title": "fa-solid fa-square-h",
			"searchTerms": ["directions", "emergency", "hospital", "hotel", "letter", "map"]
		},
		{
			"title": "fa-brands fa-square-hacker-news",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-instagram",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-js",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-lastfm",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-square-minus",
			"searchTerms": ["collapse", "delete", "hide", "minify", "negative", "remove", "shape", "trash"]
		},
		{
			"title": "fa-regular fa-square-minus",
			"searchTerms": ["collapse", "delete", "hide", "minify", "negative", "remove", "shape", "trash"]
		},
		{
			"title": "fa-solid fa-square-nfi",
			"searchTerms": ["non-food item", "supplies"]
		},
		{
			"title": "fa-brands fa-square-odnoklassniki",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-square-parking",
			"searchTerms": ["auto", "car", "garage", "meter", "parking"]
		},
		{
			"title": "fa-solid fa-square-pen",
			"searchTerms": ["edit", "pencil-square", "update", "write"]
		},
		{
			"title": "fa-solid fa-square-person-confined",
			"searchTerms": ["captivity", "confined"]
		},
		{
			"title": "fa-solid fa-square-phone",
			"searchTerms": ["call", "earphone", "number", "support", "telephone", "voice"]
		},
		{
			"title": "fa-solid fa-square-phone-flip",
			"searchTerms": ["call", "earphone", "number", "support", "telephone", "voice"]
		},
		{
			"title": "fa-brands fa-square-pied-piper",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-pinterest",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-square-plus",
			"searchTerms": ["add", "create", "expand", "new", "positive", "shape"]
		},
		{
			"title": "fa-regular fa-square-plus",
			"searchTerms": ["add", "create", "expand", "new", "positive", "shape"]
		},
		{
			"title": "fa-solid fa-square-poll-horizontal",
			"searchTerms": ["chart", "graph", "results", "survey", "trend", "vote", "voting"]
		},
		{
			"title": "fa-solid fa-square-poll-vertical",
			"searchTerms": ["chart", "graph", "results", "survey", "trend", "vote", "voting"]
		},
		{
			"title": "fa-brands fa-square-reddit",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-square-root-variable",
			"searchTerms": ["arithmetic", "calculus", "division", "math"]
		},
		{
			"title": "fa-solid fa-square-rss",
			"searchTerms": ["blog", "feed", "journal", "news", "writing"]
		},
		{
			"title": "fa-solid fa-square-share-nodes",
			"searchTerms": ["forward", "save", "send", "social"]
		},
		{
			"title": "fa-brands fa-square-snapchat",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-steam",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-threads",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-tumblr",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-twitter",
			"searchTerms": ["social network", "tweet"]
		},
		{
			"title": "fa-solid fa-square-up-right",
			"searchTerms": ["arrow", "diagonal", "direction", "external-link-square", "intercardinal", "new", "northeast", "open", "share", "up-right arrow"]
		},
		{
			"title": "fa-brands fa-square-viadeo",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-vimeo",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-square-virus",
			"searchTerms": ["coronavirus", "covid-19", "disease", "flu", "infection", "pandemic"]
		},
		{
			"title": "fa-brands fa-square-whatsapp",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-square-x-twitter",
			"searchTerms": [" elon", " x", "twitter"]
		},
		{
			"title": "fa-brands fa-square-xing",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-square-xmark",
			"searchTerms": ["close", "cross", "cross mark button", "incorrect", "mark", "notice", "notification", "notify", "problem", "square", "window", "wrong", "x", "×"]
		},
		{
			"title": "fa-brands fa-square-youtube",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-squarespace",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-stack-exchange",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-stack-overflow",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-stackpath",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-staff-snake",
			"searchTerms": ["asclepius", "asklepian", "health", "serpent", "wellness"]
		},
		{
			"title": "fa-solid fa-stairs",
			"searchTerms": ["exit", "steps", "up"]
		},
		{
			"title": "fa-solid fa-stamp",
			"searchTerms": ["art", "certificate", "imprint", "rubber", "seal"]
		},
		{
			"title": "fa-solid fa-stapler",
			"searchTerms": ["desktop", "milton", "office", "paperclip", "staple"]
		},
		{
			"title": "fa-regular fa-star",
			"searchTerms": ["achievement", "award", "favorite", "important", "night", "rating", "score", "star"]
		},
		{
			"title": "fa-regular fa-star",
			"searchTerms": ["achievement", "award", "favorite", "important", "night", "rating", "score", "star"]
		},
		{
			"title": "fa-solid fa-star-and-crescent",
			"searchTerms": ["Muslim", "islam", "muslim", "religion", "star and crescent"]
		},
		{
			"title": "fa-regular fa-star-half",
			"searchTerms": ["achievement", "award", "rating", "score", "star-half-empty", "star-half-full"]
		},
		{
			"title": "fa-regular fa-star-half",
			"searchTerms": ["achievement", "award", "rating", "score", "star-half-empty", "star-half-full"]
		},
		{
			"title": "fa-regular fa-star-half-stroke",
			"searchTerms": ["achievement", "award", "rating", "score", "star-half-empty", "star-half-full"]
		},
		{
			"title": "fa-regular fa-star-half-stroke",
			"searchTerms": ["achievement", "award", "rating", "score", "star-half-empty", "star-half-full"]
		},
		{
			"title": "fa-solid fa-star-of-david",
			"searchTerms": ["David", "Jew", "Jewish", "jewish", "judaism", "religion", "star", "star of David"]
		},
		{
			"title": "fa-solid fa-star-of-life",
			"searchTerms": ["doctor", "emt", "first aid", "health", "medical"]
		},
		{
			"title": "fa-brands fa-staylinked",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-steam",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-steam-symbol",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-sterling-sign",
			"searchTerms": ["Pound Sign", "currency"]
		},
		{
			"title": "fa-solid fa-stethoscope",
			"searchTerms": ["covid-19", "diagnosis", "doctor", "general practitioner", "heart", "hospital", "infirmary", "medicine", "office", "outpatient", "stethoscope"]
		},
		{
			"title": "fa-brands fa-sticker-mule",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-stop",
			"searchTerms": ["block", "box", "square", "stop", "stop button"]
		},
		{
			"title": "fa-solid fa-stopwatch",
			"searchTerms": ["clock", "reminder", "stopwatch", "time"]
		},
		{
			"title": "fa-solid fa-stopwatch-20",
			"searchTerms": ["ABCs", "countdown", "covid-19", "happy birthday", "i will survive", "reminder", "seconds", "time", "timer"]
		},
		{
			"title": "fa-solid fa-store",
			"searchTerms": ["bodega", "building", "buy", "market", "purchase", "shopping", "store"]
		},
		{
			"title": "fa-solid fa-store-slash",
			"searchTerms": ["building", "buy", "closed", "covid-19", "purchase", "shopping"]
		},
		{
			"title": "fa-brands fa-strava",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-street-view",
			"searchTerms": ["directions", "location", "map", "navigation"]
		},
		{
			"title": "fa-solid fa-strikethrough",
			"searchTerms": ["cancel", "edit", "font", "format", "text", "type"]
		},
		{
			"title": "fa-brands fa-stripe",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-stripe-s",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-stroopwafel",
			"searchTerms": ["caramel", "cookie", "dessert", "sweets", "waffle"]
		},
		{
			"title": "fa-brands fa-stubber",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-studiovinari",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-stumbleupon",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-stumbleupon-circle",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-subscript",
			"searchTerms": ["edit", "font", "format", "text", "type"]
		},
		{
			"title": "fa-solid fa-suitcase",
			"searchTerms": ["baggage", "luggage", "move", "packing", "suitcase", "travel", "trip"]
		},
		{
			"title": "fa-solid fa-suitcase-medical",
			"searchTerms": ["first aid", "firstaid", "health", "help", "medical", "supply", "support"]
		},
		{
			"title": "fa-solid fa-suitcase-rolling",
			"searchTerms": ["baggage", "luggage", "move", "suitcase", "travel", "trip"]
		},
		{
			"title": "fa-regular fa-sun",
			"searchTerms": ["bright", "brighten", "contrast", "day", "lighter", "rays", "sol", "solar", "star", "sun", "sunny", "weather"]
		},
		{
			"title": "fa-regular fa-sun",
			"searchTerms": ["bright", "brighten", "contrast", "day", "lighter", "rays", "sol", "solar", "star", "sun", "sunny", "weather"]
		},
		{
			"title": "fa-solid fa-sun-plant-wilt",
			"searchTerms": ["arid", "droop", "drought"]
		},
		{
			"title": "fa-brands fa-superpowers",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-superscript",
			"searchTerms": ["edit", "exponential", "font", "format", "text", "type"]
		},
		{
			"title": "fa-brands fa-supple",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-suse",
			"searchTerms": ["linux", "operating system", "os"]
		},
		{
			"title": "fa-solid fa-swatchbook",
			"searchTerms": ["Pantone", "color", "design", "hue", "palette"]
		},
		{
			"title": "fa-brands fa-swift",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-symfony",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-synagogue",
			"searchTerms": ["Jew", "Jewish", "building", "jewish", "judaism", "religion", "star of david", "synagogue", "temple"]
		},
		{
			"title": "fa-solid fa-syringe",
			"searchTerms": ["covid-19", "doctor", "immunizations", "medical", "medicine", "needle", "shot", "sick", "syringe", "vaccinate", "vaccine"]
		},
		{
			"title": "fa-solid fa-t",
			"searchTerms": ["Latin Capital Letter T", "Latin Small Letter T", "letter"]
		},
		{
			"title": "fa-solid fa-table",
			"searchTerms": ["data", "excel", "spreadsheet"]
		},
		{
			"title": "fa-solid fa-table-cells",
			"searchTerms": ["blocks", "boxes", "grid", "squares"]
		},
		{
			"title": "fa-solid fa-table-cells-large",
			"searchTerms": ["blocks", "boxes", "grid", "squares"]
		},
		{
			"title": "fa-solid fa-table-columns",
			"searchTerms": ["browser", "dashboard", "organize", "panes", "split"]
		},
		{
			"title": "fa-solid fa-table-list",
			"searchTerms": ["checklist", "completed", "done", "finished", "ol", "todo", "ul"]
		},
		{
			"title": "fa-solid fa-table-tennis-paddle-ball",
			"searchTerms": ["ball", "bat", "game", "paddle", "ping pong", "table tennis"]
		},
		{
			"title": "fa-solid fa-tablet",
			"searchTerms": ["device", "kindle", "screen"]
		},
		{
			"title": "fa-solid fa-tablet-button",
			"searchTerms": ["apple", "device", "ipad", "kindle", "screen"]
		},
		{
			"title": "fa-solid fa-tablet-screen-button",
			"searchTerms": ["apple", "device", "ipad", "kindle", "screen"]
		},
		{
			"title": "fa-solid fa-tablets",
			"searchTerms": ["drugs", "medicine", "pills", "prescription"]
		},
		{
			"title": "fa-solid fa-tachograph-digital",
			"searchTerms": ["data", "distance", "speed", "tachometer"]
		},
		{
			"title": "fa-solid fa-tag",
			"searchTerms": ["discount", "labe", "label", "price", "shopping"]
		},
		{
			"title": "fa-solid fa-tags",
			"searchTerms": ["discount", "label", "price", "shopping"]
		},
		{
			"title": "fa-solid fa-tape",
			"searchTerms": ["design", "package", "sticky"]
		},
		{
			"title": "fa-solid fa-tarp",
			"searchTerms": ["protection", "tarp", "tent", "waterproof"]
		},
		{
			"title": "fa-solid fa-tarp-droplet",
			"searchTerms": ["protection", "tarp", "tent", "waterproof"]
		},
		{
			"title": "fa-solid fa-taxi",
			"searchTerms": ["cab", "cabbie", "car", "car service", "lyft", "machine", "oncoming", "oncoming taxi", "taxi", "transportation", "travel", "uber", "vehicle"]
		},
		{
			"title": "fa-brands fa-teamspeak",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-teeth",
			"searchTerms": ["bite", "dental", "dentist", "gums", "mouth", "smile", "tooth"]
		},
		{
			"title": "fa-solid fa-teeth-open",
			"searchTerms": ["dental", "dentist", "gums bite", "mouth", "smile", "tooth"]
		},
		{
			"title": "fa-brands fa-telegram",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-temperature-arrow-down",
			"searchTerms": ["air conditioner", "cold", "heater", "mercury", "thermometer", "winter"]
		},
		{
			"title": "fa-solid fa-temperature-arrow-up",
			"searchTerms": ["air conditioner", "cold", "heater", "mercury", "thermometer", "winter"]
		},
		{
			"title": "fa-solid fa-temperature-empty",
			"searchTerms": ["cold", "mercury", "status", "temperature"]
		},
		{
			"title": "fa-solid fa-temperature-full",
			"searchTerms": ["fever", "hot", "mercury", "status", "temperature"]
		},
		{
			"title": "fa-solid fa-temperature-half",
			"searchTerms": ["mercury", "status", "temperature", "thermometer", "weather"]
		},
		{
			"title": "fa-solid fa-temperature-high",
			"searchTerms": ["cook", "covid-19", "mercury", "summer", "thermometer", "warm"]
		},
		{
			"title": "fa-solid fa-temperature-low",
			"searchTerms": ["cold", "cool", "covid-19", "mercury", "thermometer", "winter"]
		},
		{
			"title": "fa-solid fa-temperature-quarter",
			"searchTerms": ["mercury", "status", "temperature"]
		},
		{
			"title": "fa-solid fa-temperature-three-quarters",
			"searchTerms": ["mercury", "status", "temperature"]
		},
		{
			"title": "fa-brands fa-tencent-weibo",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-tenge-sign",
			"searchTerms": ["Tenge Sign", "currency"]
		},
		{
			"title": "fa-solid fa-tent",
			"searchTerms": ["bivouac", "campground", "refugee", "shelter", "tent"]
		},
		{
			"title": "fa-solid fa-tent-arrow-down-to-line",
			"searchTerms": ["permanent", "refugee", "shelter"]
		},
		{
			"title": "fa-solid fa-tent-arrow-left-right",
			"searchTerms": ["refugee", "shelter", "transition"]
		},
		{
			"title": "fa-solid fa-tent-arrow-turn-left",
			"searchTerms": ["refugee", "shelter", "temporary"]
		},
		{
			"title": "fa-solid fa-tent-arrows-down",
			"searchTerms": ["refugee", "shelter", "spontaneous"]
		},
		{
			"title": "fa-solid fa-tents",
			"searchTerms": ["bivouac", "campground", "refugee", "shelter", "tent"]
		},
		{
			"title": "fa-solid fa-terminal",
			"searchTerms": ["code", "coding", "command", "console", "development", "prompt", "terminal"]
		},
		{
			"title": "fa-solid fa-text-height",
			"searchTerms": ["edit", "font", "format", "text", "type"]
		},
		{
			"title": "fa-solid fa-text-slash",
			"searchTerms": ["cancel", "font", "format", "remove", "style", "text"]
		},
		{
			"title": "fa-solid fa-text-width",
			"searchTerms": ["edit", "font", "format", "text", "type"]
		},
		{
			"title": "fa-brands fa-the-red-yeti",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-themeco",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-themeisle",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-thermometer",
			"searchTerms": ["covid-19", "mercury", "status", "temperature"]
		},
		{
			"title": "fa-brands fa-think-peaks",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-threads",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-thumbs-down",
			"searchTerms": ["-1", "disagree", "disapprove", "dislike", "down", "hand", "social", "thumb", "thumbs down", "thumbs-o-down"]
		},
		{
			"title": "fa-regular fa-thumbs-down",
			"searchTerms": ["-1", "disagree", "disapprove", "dislike", "down", "hand", "social", "thumb", "thumbs down", "thumbs-o-down"]
		},
		{
			"title": "fa-regular fa-thumbs-up",
			"searchTerms": ["+1", "agree", "approve", "favorite", "hand", "like", "ok", "okay", "social", "success", "thumb", "thumbs up", "thumbs-o-up", "up", "yes", "you got it dude"]
		},
		{
			"title": "fa-regular fa-thumbs-up",
			"searchTerms": ["+1", "agree", "approve", "favorite", "hand", "like", "ok", "okay", "social", "success", "thumb", "thumbs up", "thumbs-o-up", "up", "yes", "you got it dude"]
		},
		{
			"title": "fa-solid fa-thumbtack",
			"searchTerms": ["Black Pushpin", "coordinates", "location", "marker", "pin", "pushpin", "thumb-tack"]
		},
		{
			"title": "fa-solid fa-ticket",
			"searchTerms": ["admission", "admission tickets", "movie", "pass", "support", "ticket"]
		},
		{
			"title": "fa-solid fa-ticket-simple",
			"searchTerms": ["movie", "pass", "support", "ticket"]
		},
		{
			"title": "fa-brands fa-tiktok",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-timeline",
			"searchTerms": ["chronological", "deadline", "history", "linear"]
		},
		{
			"title": "fa-solid fa-toggle-off",
			"searchTerms": ["button", "off", "on", "switch"]
		},
		{
			"title": "fa-solid fa-toggle-on",
			"searchTerms": ["button", "off", "on", "switch"]
		},
		{
			"title": "fa-solid fa-toilet",
			"searchTerms": ["bathroom", "flush", "john", "loo", "pee", "plumbing", "poop", "porcelain", "potty", "restroom", "throne", "toile", "toilet", "washroom", "waste", "wc"]
		},
		{
			"title": "fa-solid fa-toilet-paper",
			"searchTerms": ["bathroom", "covid-19", "halloween", "holiday", "lavatory", "paper towels", "prank", "privy", "restroom", "roll", "roll of paper", "toilet", "toilet paper", "wipe"]
		},
		{
			"title": "fa-solid fa-toilet-paper-slash",
			"searchTerms": ["bathroom", "covid-19", "halloween", "holiday", "lavatory", "leaves", "prank", "privy", "restroom", "roll", "toilet", "trouble", "ut oh", "wipe"]
		},
		{
			"title": "fa-solid fa-toilet-portable",
			"searchTerms": ["outhouse", "toilet"]
		},
		{
			"title": "fa-solid fa-toilets-portable",
			"searchTerms": ["outhouse", "toilet"]
		},
		{
			"title": "fa-solid fa-toolbox",
			"searchTerms": ["admin", "chest", "container", "fix", "mechanic", "repair", "settings", "tool", "toolbox", "tools"]
		},
		{
			"title": "fa-solid fa-tooth",
			"searchTerms": ["bicuspid", "dental", "dentist", "molar", "mouth", "teeth", "tooth"]
		},
		{
			"title": "fa-solid fa-torii-gate",
			"searchTerms": ["building", "religion", "shinto", "shinto shrine", "shintoism", "shrine"]
		},
		{
			"title": "fa-solid fa-tornado",
			"searchTerms": ["cloud", "cyclone", "dorothy", "landspout", "tornado", "toto", "twister", "vortext", "waterspout", "weather", "whirlwind"]
		},
		{
			"title": "fa-solid fa-tower-broadcast",
			"searchTerms": ["airwaves", "antenna", "communication", "emergency", "radio", "reception", "waves"]
		},
		{
			"title": "fa-solid fa-tower-cell",
			"searchTerms": ["airwaves", "antenna", "communication", "radio", "reception", "waves"]
		},
		{
			"title": "fa-solid fa-tower-observation",
			"searchTerms": ["fire tower", "view"]
		},
		{
			"title": "fa-solid fa-tractor",
			"searchTerms": ["agriculture", "farm", "tractor", "vehicle"]
		},
		{
			"title": "fa-brands fa-trade-federation",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-trademark",
			"searchTerms": ["copyright", "mark", "register", "symbol", "tm", "trade mark", "trademark"]
		},
		{
			"title": "fa-solid fa-traffic-light",
			"searchTerms": ["direction", "light", "road", "signal", "traffic", "travel", "vertical traffic light"]
		},
		{
			"title": "fa-solid fa-trailer",
			"searchTerms": ["carry", "haul", "moving", "travel"]
		},
		{
			"title": "fa-solid fa-train",
			"searchTerms": ["bullet", "commute", "locomotive", "railway", "subway", "train"]
		},
		{
			"title": "fa-solid fa-train-subway",
			"searchTerms": ["machine", "railway", "train", "transportation", "vehicle"]
		},
		{
			"title": "fa-solid fa-train-tram",
			"searchTerms": ["crossing", "machine", "mountains", "seasonal", "tram", "transportation", "trolleybus"]
		},
		{
			"title": "fa-solid fa-transgender",
			"searchTerms": ["female", "gender", "intersex", "male", "transgender", "transgender symbol"]
		},
		{
			"title": "fa-solid fa-trash",
			"searchTerms": ["delete", "garbage", "hide", "remove"]
		},
		{
			"title": "fa-solid fa-trash-arrow-up",
			"searchTerms": ["back", "control z", "delete", "garbage", "hide", "oops", "remove", "undo"]
		},
		{
			"title": "fa-regular fa-trash-can",
			"searchTerms": ["delete", "garbage", "hide", "remove", "trash-o"]
		},
		{
			"title": "fa-regular fa-trash-can",
			"searchTerms": ["delete", "garbage", "hide", "remove", "trash-o"]
		},
		{
			"title": "fa-solid fa-trash-can-arrow-up",
			"searchTerms": ["back", "control z", "delete", "garbage", "hide", "oops", "remove", "undo"]
		},
		{
			"title": "fa-solid fa-tree",
			"searchTerms": ["bark", "evergreen tree", "fall", "flora", "forest", "nature", "plant", "seasonal", "tree"]
		},
		{
			"title": "fa-solid fa-tree-city",
			"searchTerms": ["building", "city", "urban"]
		},
		{
			"title": "fa-brands fa-trello",
			"searchTerms": ["atlassian"]
		},
		{
			"title": "fa-solid fa-triangle-exclamation",
			"searchTerms": ["alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warnin", "warning"]
		},
		{
			"title": "fa-solid fa-trophy",
			"searchTerms": ["achievement", "award", "cup", "game", "prize", "trophy", "winner"]
		},
		{
			"title": "fa-solid fa-trowel",
			"searchTerms": ["build", "construction", "tool"]
		},
		{
			"title": "fa-solid fa-trowel-bricks",
			"searchTerms": ["build", "construction", "reconstruction", "tool"]
		},
		{
			"title": "fa-solid fa-truck",
			"searchTerms": ["Black Truck", "cargo", "delivery", "delivery truck", "shipping", "truck", "vehicle"]
		},
		{
			"title": "fa-solid fa-truck-arrow-right",
			"searchTerms": ["access", "fast", "shipping", "transport"]
		},
		{
			"title": "fa-solid fa-truck-droplet",
			"searchTerms": ["thirst", "truck", "water", "water supply"]
		},
		{
			"title": "fa-solid fa-truck-fast",
			"searchTerms": ["express", "fedex", "mail", "overnight", "package", "ups"]
		},
		{
			"title": "fa-solid fa-truck-field",
			"searchTerms": ["supplies", "truck"]
		},
		{
			"title": "fa-solid fa-truck-field-un",
			"searchTerms": ["supplies", "truck", "united nations"]
		},
		{
			"title": "fa-solid fa-truck-front",
			"searchTerms": ["shuttle", "truck", "van"]
		},
		{
			"title": "fa-solid fa-truck-medical",
			"searchTerms": ["ambulance", "clinic", "covid-19", "emergency", "emt", "er", "help", "hospital", "mobile", "support", "vehicle"]
		},
		{
			"title": "fa-solid fa-truck-monster",
			"searchTerms": ["offroad", "vehicle", "wheel"]
		},
		{
			"title": "fa-solid fa-truck-moving",
			"searchTerms": ["cargo", "inventory", "rental", "vehicle"]
		},
		{
			"title": "fa-solid fa-truck-pickup",
			"searchTerms": ["cargo", "pick-up", "pickup", "pickup truck", "truck", "vehicle"]
		},
		{
			"title": "fa-solid fa-truck-plane",
			"searchTerms": ["airplane", "plane", "transportation", "truck", "vehicle"]
		},
		{
			"title": "fa-solid fa-truck-ramp-box",
			"searchTerms": ["box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle"]
		},
		{
			"title": "fa-solid fa-tty",
			"searchTerms": ["communication", "deaf", "telephone", "teletypewriter", "text"]
		},
		{
			"title": "fa-brands fa-tumblr",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-turkish-lira-sign",
			"searchTerms": ["Turkish Lira Sign", "currency"]
		},
		{
			"title": "fa-solid fa-turn-down",
			"searchTerms": ["arrow", "down", "level-down", "right arrow curving down"]
		},
		{
			"title": "fa-solid fa-turn-up",
			"searchTerms": ["arrow", "level-up", "right arrow curving up"]
		},
		{
			"title": "fa-solid fa-tv",
			"searchTerms": ["computer", "display", "monitor", "television"]
		},
		{
			"title": "fa-brands fa-twitch",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-twitter",
			"searchTerms": ["social network", "tweet"]
		},
		{
			"title": "fa-brands fa-typo3",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-u",
			"searchTerms": ["Latin Capital Letter U", "Latin Small Letter U", "letter"]
		},
		{
			"title": "fa-brands fa-uber",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-ubuntu",
			"searchTerms": ["linux", "operating system", "os"]
		},
		{
			"title": "fa-brands fa-uikit",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-umbraco",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-umbrella",
			"searchTerms": ["protection", "rain", "storm", "wet"]
		},
		{
			"title": "fa-solid fa-umbrella-beach",
			"searchTerms": ["beach", "beach with umbrella", "protection", "recreation", "sand", "shade", "summer", "sun", "umbrella"]
		},
		{
			"title": "fa-brands fa-uncharted",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-underline",
			"searchTerms": ["edit", "emphasis", "format", "text", "writing"]
		},
		{
			"title": "fa-brands fa-uniregistry",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-unity",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-universal-access",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-unlock",
			"searchTerms": ["admin", "lock", "open", "password", "private", "protect", "unlock", "unlocked"]
		},
		{
			"title": "fa-solid fa-unlock-keyhole",
			"searchTerms": ["admin", "lock", "password", "private", "protect"]
		},
		{
			"title": "fa-brands fa-unsplash",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-untappd",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-up-down",
			"searchTerms": ["Up Down Black Arrow", "arrow", "arrows-v", "expand", "portrait", "resize", "tall", "up-down arrow", "vertical"]
		},
		{
			"title": "fa-solid fa-up-down-left-right",
			"searchTerms": ["arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize"]
		},
		{
			"title": "fa-solid fa-up-long",
			"searchTerms": ["long-arrow-up", "upload"]
		},
		{
			"title": "fa-solid fa-up-right-and-down-left-from-center",
			"searchTerms": ["arrows", "bigger", "enlarge", "fullscreen", "resize"]
		},
		{
			"title": "fa-solid fa-up-right-from-square",
			"searchTerms": ["external-link", "new", "open", "share"]
		},
		{
			"title": "fa-solid fa-upload",
			"searchTerms": ["hard drive", "import", "publish"]
		},
		{
			"title": "fa-brands fa-ups",
			"searchTerms": ["United Parcel Service", "package", "shipping"]
		},
		{
			"title": "fa-brands fa-usb",
			"searchTerms": []
		},
		{
			"title": "fa-regular fa-user",
			"searchTerms": ["adult", "bust", "bust in silhouette", "gender-neutral", "person", "profile", "silhouette", "unspecified gender", "users-people"]
		},
		{
			"title": "fa-regular fa-user",
			"searchTerms": ["adult", "bust", "bust in silhouette", "gender-neutral", "person", "profile", "silhouette", "unspecified gender", "users-people"]
		},
		{
			"title": "fa-solid fa-user-astronaut",
			"searchTerms": ["avatar", "clothing", "cosmonaut", "nasa", "space", "suit"]
		},
		{
			"title": "fa-solid fa-user-check",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-clock",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-doctor",
			"searchTerms": ["covid-19", "health", "job", "medical", "nurse", "occupation", "physician", "profile", "surgeon", "worker"]
		},
		{
			"title": "fa-solid fa-user-gear",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-graduate",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-group",
			"searchTerms": ["bust", "busts in silhouette", "silhouette", "users-people"]
		},
		{
			"title": "fa-solid fa-user-injured",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-large",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-large-slash",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-lock",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-minus",
			"searchTerms": ["delete", "negative", "remove"]
		},
		{
			"title": "fa-solid fa-user-ninja",
			"searchTerms": ["assassin", "avatar", "dangerous", "deadly", "fighter", "hidden", "ninja", "sneaky", "stealth"]
		},
		{
			"title": "fa-solid fa-user-nurse",
			"searchTerms": ["covid-19", "doctor", "health", "md", "medical", "midwife", "physician", "practitioner", "surgeon", "worker"]
		},
		{
			"title": "fa-solid fa-user-pen",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-plus",
			"searchTerms": ["add", "avatar", "positive", "sign up", "signup", "team"]
		},
		{
			"title": "fa-solid fa-user-secret",
			"searchTerms": ["detective", "sleuth", "spy", "users-people"]
		},
		{
			"title": "fa-solid fa-user-shield",
			"searchTerms": ["protect", "safety"]
		},
		{
			"title": "fa-solid fa-user-slash",
			"searchTerms": ["ban", "delete", "remove"]
		},
		{
			"title": "fa-solid fa-user-tag",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-user-tie",
			"searchTerms": ["avatar", "business", "clothing", "formal", "professional", "suit"]
		},
		{
			"title": "fa-solid fa-user-xmark",
			"searchTerms": ["archive", "delete", "remove", "x"]
		},
		{
			"title": "fa-solid fa-users",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-users-between-lines",
			"searchTerms": ["covered", "group", "people"]
		},
		{
			"title": "fa-solid fa-users-gear",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-users-line",
			"searchTerms": ["group", "need", "people"]
		},
		{
			"title": "fa-solid fa-users-rays",
			"searchTerms": ["affected", "focused", "group", "people"]
		},
		{
			"title": "fa-solid fa-users-rectangle",
			"searchTerms": ["focus", "group", "people", "reached"]
		},
		{
			"title": "fa-solid fa-users-slash",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-users-viewfinder",
			"searchTerms": ["focus", "group", "people", "targeted"]
		},
		{
			"title": "fa-brands fa-usps",
			"searchTerms": ["american", "package", "shipping", "usa"]
		},
		{
			"title": "fa-brands fa-ussunnah",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-utensils",
			"searchTerms": ["cooking", "cutlery", "dining", "dinner", "eat", "food", "fork", "fork and knife", "knife", "restaurant"]
		},
		{
			"title": "fa-solid fa-v",
			"searchTerms": ["Latin Capital Letter V", "Latin Small Letter V", "letter"]
		},
		{
			"title": "fa-brands fa-vaadin",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-van-shuttle",
			"searchTerms": ["airport", "bus", "machine", "minibus", "public-transportation", "transportation", "travel", "vehicle"]
		},
		{
			"title": "fa-solid fa-vault",
			"searchTerms": ["bank", "important", "lock", "money", "safe"]
		},
		{
			"title": "fa-solid fa-vector-square",
			"searchTerms": ["anchors", "lines", "object", "render", "shape"]
		},
		{
			"title": "fa-solid fa-venus",
			"searchTerms": ["female", "female sign", "gender", "woman"]
		},
		{
			"title": "fa-solid fa-venus-double",
			"searchTerms": ["Doubled Female Sign", "female", "gender", "lesbian"]
		},
		{
			"title": "fa-solid fa-venus-mars",
			"searchTerms": ["Interlocked Female and Male Sign", "female", "gender", "heterosexual", "male"]
		},
		{
			"title": "fa-solid fa-vest",
			"searchTerms": ["biker", "fashion", "style"]
		},
		{
			"title": "fa-solid fa-vest-patches",
			"searchTerms": ["biker", "fashion", "style"]
		},
		{
			"title": "fa-brands fa-viacoin",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-viadeo",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-vial",
			"searchTerms": ["ampule", "chemist", "chemistry", "experiment", "lab", "sample", "science", "test", "test tube"]
		},
		{
			"title": "fa-solid fa-vial-circle-check",
			"searchTerms": ["ampule", "chemist", "chemistry", "not affected", "ok", "okay", "success", "test tube", "tube", "vaccine"]
		},
		{
			"title": "fa-solid fa-vial-virus",
			"searchTerms": ["ampule", "coronavirus", "covid-19", "flue", "infection", "lab", "laboratory", "pandemic", "test", "test tube", "vaccine"]
		},
		{
			"title": "fa-solid fa-vials",
			"searchTerms": ["ampule", "experiment", "lab", "sample", "science", "test", "test tube"]
		},
		{
			"title": "fa-brands fa-viber",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-video",
			"searchTerms": ["camera", "film", "movie", "record", "video-camera"]
		},
		{
			"title": "fa-solid fa-video-slash",
			"searchTerms": ["add", "create", "film", "new", "positive", "record", "video"]
		},
		{
			"title": "fa-solid fa-vihara",
			"searchTerms": ["buddhism", "buddhist", "building", "monastery"]
		},
		{
			"title": "fa-brands fa-vimeo",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-vimeo-v",
			"searchTerms": ["vimeo"]
		},
		{
			"title": "fa-brands fa-vine",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-virus",
			"searchTerms": ["bug", "coronavirus", "covid-19", "flu", "health", "infection", "pandemic", "sick", "vaccine", "viral"]
		},
		{
			"title": "fa-solid fa-virus-covid",
			"searchTerms": ["bug", "covid-19", "flu", "health", "infection", "pandemic", "vaccine", "viral", "virus"]
		},
		{
			"title": "fa-solid fa-virus-covid-slash",
			"searchTerms": ["bug", "covid-19", "flu", "health", "infection", "pandemic", "vaccine", "viral", "virus"]
		},
		{
			"title": "fa-solid fa-virus-slash",
			"searchTerms": ["bug", "coronavirus", "covid-19", "cure", "eliminate", "flu", "health", "infection", "pandemic", "sick", "vaccine", "viral"]
		},
		{
			"title": "fa-solid fa-viruses",
			"searchTerms": ["bugs", "coronavirus", "covid-19", "flu", "health", "infection", "multiply", "pandemic", "sick", "spread", "vaccine", "viral"]
		},
		{
			"title": "fa-brands fa-vk",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-vnv",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-voicemail",
			"searchTerms": ["answer", "inbox", "message", "phone"]
		},
		{
			"title": "fa-solid fa-volcano",
			"searchTerms": ["caldera", "eruption", "lava", "magma", "mountain", "smoke", "volcano"]
		},
		{
			"title": "fa-solid fa-volleyball",
			"searchTerms": ["ball", "beach", "game", "olympics", "sport", "volleyball"]
		},
		{
			"title": "fa-solid fa-volume-high",
			"searchTerms": ["audio", "higher", "loud", "louder", "music", "sound", "speaker", "speaker high volume"]
		},
		{
			"title": "fa-solid fa-volume-low",
			"searchTerms": ["audio", "lower", "music", "quieter", "soft", "sound", "speaker", "speaker low volume"]
		},
		{
			"title": "fa-solid fa-volume-off",
			"searchTerms": ["audio", "ban", "music", "mute", "quiet", "silent", "sound"]
		},
		{
			"title": "fa-solid fa-volume-xmark",
			"searchTerms": ["audio", "music", "quiet", "sound", "speaker"]
		},
		{
			"title": "fa-solid fa-vr-cardboard",
			"searchTerms": ["3d", "augment", "google", "reality", "virtual"]
		},
		{
			"title": "fa-brands fa-vuejs",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-w",
			"searchTerms": ["Latin Capital Letter W", "Latin Small Letter W", "letter"]
		},
		{
			"title": "fa-solid fa-walkie-talkie",
			"searchTerms": ["communication", "copy", "intercom", "over", "portable", "radio", "two way radio"]
		},
		{
			"title": "fa-solid fa-wallet",
			"searchTerms": ["billfold", "cash", "currency", "money"]
		},
		{
			"title": "fa-solid fa-wand-magic",
			"searchTerms": ["autocomplete", "automatic", "mage", "magic", "spell", "wand", "witch", "wizard"]
		},
		{
			"title": "fa-solid fa-wand-magic-sparkles",
			"searchTerms": ["auto", "magic", "magic wand", "trick", "witch", "wizard"]
		},
		{
			"title": "fa-solid fa-wand-sparkles",
			"searchTerms": ["autocomplete", "automatic", "fantasy", "halloween", "holiday", "magic", "weapon", "witch", "wizard"]
		},
		{
			"title": "fa-solid fa-warehouse",
			"searchTerms": ["building", "capacity", "garage", "inventory", "storage"]
		},
		{
			"title": "fa-brands fa-watchman-monitoring",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-water",
			"searchTerms": ["lake", "liquid", "ocean", "sea", "swim", "wet"]
		},
		{
			"title": "fa-solid fa-water-ladder",
			"searchTerms": ["ladder", "recreation", "swim", "water"]
		},
		{
			"title": "fa-solid fa-wave-square",
			"searchTerms": ["frequency", "pulse", "signal"]
		},
		{
			"title": "fa-brands fa-waze",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-weebly",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-weibo",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-weight-hanging",
			"searchTerms": ["anvil", "heavy", "measurement"]
		},
		{
			"title": "fa-solid fa-weight-scale",
			"searchTerms": ["health", "measurement", "scale", "weight"]
		},
		{
			"title": "fa-brands fa-weixin",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-whatsapp",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-wheat-awn",
			"searchTerms": ["agriculture", "autumn", "fall", "farming", "grain"]
		},
		{
			"title": "fa-solid fa-wheat-awn-circle-exclamation",
			"searchTerms": ["affected", "famine", "food", "gluten", "hunger", "starve", "straw"]
		},
		{
			"title": "fa-solid fa-wheelchair",
			"searchTerms": ["users-people"]
		},
		{
			"title": "fa-solid fa-wheelchair-move",
			"searchTerms": ["access", "handicap", "impairment", "physical", "wheelchair symbol"]
		},
		{
			"title": "fa-solid fa-whiskey-glass",
			"searchTerms": ["alcohol", "bar", "beverage", "bourbon", "drink", "glass", "liquor", "neat", "rye", "scotch", "shot", "tumbler", "tumbler glass", "whisky"]
		},
		{
			"title": "fa-brands fa-whmcs",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-wifi",
			"searchTerms": ["connection", "hotspot", "internet", "network", "wireless"]
		},
		{
			"title": "fa-brands fa-wikipedia-w",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-wind",
			"searchTerms": ["air", "blow", "breeze", "fall", "seasonal", "weather"]
		},
		{
			"title": "fa-regular fa-window-maximize",
			"searchTerms": ["Maximize", "browser", "computer", "development", "expand"]
		},
		{
			"title": "fa-regular fa-window-maximize",
			"searchTerms": ["Maximize", "browser", "computer", "development", "expand"]
		},
		{
			"title": "fa-regular fa-window-minimize",
			"searchTerms": ["Minimize", "browser", "collapse", "computer", "development"]
		},
		{
			"title": "fa-regular fa-window-minimize",
			"searchTerms": ["Minimize", "browser", "collapse", "computer", "development"]
		},
		{
			"title": "fa-regular fa-window-restore",
			"searchTerms": ["browser", "computer", "development"]
		},
		{
			"title": "fa-regular fa-window-restore",
			"searchTerms": ["browser", "computer", "development"]
		},
		{
			"title": "fa-brands fa-windows",
			"searchTerms": ["microsoft", "operating system", "os"]
		},
		{
			"title": "fa-solid fa-wine-bottle",
			"searchTerms": ["alcohol", "beverage", "cabernet", "drink", "glass", "grapes", "merlot", "sauvignon"]
		},
		{
			"title": "fa-solid fa-wine-glass",
			"searchTerms": ["alcohol", "bar", "beverage", "cabernet", "drink", "glass", "grapes", "merlot", "sauvignon", "wine", "wine glass"]
		},
		{
			"title": "fa-solid fa-wine-glass-empty",
			"searchTerms": ["alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon"]
		},
		{
			"title": "fa-brands fa-wirsindhandwerk",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wix",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wizards-of-the-coast",
			"searchTerms": ["Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop"]
		},
		{
			"title": "fa-brands fa-wodu",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wolf-pack-battalion",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-won-sign",
			"searchTerms": ["Won Sign", "currency"]
		},
		{
			"title": "fa-brands fa-wordpress",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wordpress-simple",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-worm",
			"searchTerms": ["dirt", "garden", "worm", "wriggle"]
		},
		{
			"title": "fa-brands fa-wpbeginner",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wpexplorer",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wpforms",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-wpressr",
			"searchTerms": ["rendact"]
		},
		{
			"title": "fa-solid fa-wrench",
			"searchTerms": ["construction", "fix", "mechanic", "plumbing", "settings", "spanner", "tool", "update", "wrench"]
		},
		{
			"title": "fa-solid fa-x",
			"searchTerms": ["Latin Capital Letter X", "Latin Small Letter X", "letter"]
		},
		{
			"title": "fa-solid fa-x-ray",
			"searchTerms": ["health", "medical", "radiological images", "radiology", "skeleton"]
		},
		{
			"title": "fa-brands fa-x-twitter",
			"searchTerms": [" elon", " twitter", " x"]
		},
		{
			"title": "fa-brands fa-xbox",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-xing",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-xmark",
			"searchTerms": ["Cancellation X", "Multiplication Sign", "Multiplication X", "cancel", "close", "cross", "cross mark", "error", "exit", "incorrect", "mark", "multiplication", "multiply", "notice", "notification", "notify", "problem", "sign", "wrong", "x", "×"]
		},
		{
			"title": "fa-solid fa-xmarks-lines",
			"searchTerms": ["barricade", "barrier", "fence", "poison", "roadblock"]
		},
		{
			"title": "fa-solid fa-y",
			"searchTerms": ["Latin Capital Letter Y", "Latin Small Letter Y", "letter", "yay", "yes"]
		},
		{
			"title": "fa-brands fa-y-combinator",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-yahoo",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-yammer",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-yandex",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-yandex-international",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-yarn",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-yelp",
			"searchTerms": []
		},
		{
			"title": "fa-solid fa-yen-sign",
			"searchTerms": ["Yen Sign", "currency"]
		},
		{
			"title": "fa-solid fa-yin-yang",
			"searchTerms": ["daoism", "opposites", "religion", "tao", "taoism", "taoist", "yang", "yin", "yin yang"]
		},
		{
			"title": "fa-brands fa-yoast",
			"searchTerms": []
		},
		{
			"title": "fa-brands fa-youtube",
			"searchTerms": ["film", "video", "youtube-play", "youtube-square"]
		},
		{
			"title": "fa-solid fa-z",
			"searchTerms": ["Latin Capital Letter Z", "Latin Small Letter Z", "letter"]
		},
		{
			"title": "fa-brands fa-zhihu",
			"searchTerms": []
		}
		]
	});
});