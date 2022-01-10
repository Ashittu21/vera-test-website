(function (window) {
  window.VERA = window.VERA || {};

  VERA.mapInit = function (options) {
    var populateData = function (data) {
      //self.title.html(data.title);
      self.overview.html(data.body);

      console.log(data.level);

      if (data.level === 0) {
        //console.log('from pop');
        //TODO this reset was triggering twice, from here and from useData...why
        //self.stateSelect.removeClass('as-title');
        //self.markerSelect.removeClass('as-title');
        //self.title.show()
        //self.title.closest('.map__header').find('.back').before(self.stateSelect).before(self.markerSelect);
      } else if (data.level === 1) {
        //self.title.closest('.map__header').find('.back').before(self.markerSelect);
        //self.markerSelect.removeClass('as-title');
        //self.title.hide();
        //self.titleWrap.after(self.stateSelect);
        //self.stateSelect.addClass('as-title');
      } else {
        //self.title.closest('.map__header').find('.back').before(self.stateSelect);
        //self.stateSelect.removeClass('as-title');
        //self.title.hide()
        //self.titleWrap.after(self.markerSelect);
        //self.markerSelect.addClass('as-title');

        if (self.markerSelect.children().length == 2) {
          self.nextMarkerButton.addClass("hidden");
        } else {
          self.nextMarkerButton.removeClass("hidden");
        }
      }

      resizeSelects();
      //initilize any slider cta that are in the
      Site.slideout();
    };

    var useData = function (data, backTo) {
      backTo = backTo || null;

      self.overview.css({ opacity: 0 });
      self.populateData(data);
      self.overview.animate({ opacity: 1 });

      if (data.level === 0) {
        //console.log('from use');
        reset();
      }

      self.container.attr("data-level", data.level);

      if (backTo !== null) {
        self.back.addClass("show");
      } else {
        self.back.removeClass("show");
      }
      self.currentBackTo = backTo;

      //determineOverflow();
    };

    var self = this;

    var defaults = {
      zoom: true,
      zoomRatio: 1,
      zoomState: false,
      populateData: populateData,
    };

    options = options !== null ? options : {};

    self.options = extendDefaults(options, defaults);

    function extendDefaults(options, defaults) {
      Object.keys(defaults).forEach(function (key) {
        if (!(key in options)) {
          options[key] = defaults[key];
        }
      });
      return options;
    }

    self.populateData = self.options.populateData;

    self.useData = useData;

    var markersize = 8;
    var transitionTime = 500;
    var activeClass = "zoomed";

    var width = 960,
      height = 600,
      active = d3.select(null),
      blurCloneMap;

    this.svg = d3.select("#" + VERA.mapdata.mapid + " .project-map-svg");
    this.svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0 0 " + width + " " + height);

    this.projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale([1250]);

    this.path = d3.geoPath().projection(self.projection);

    this.mapdata = VERA.mapdata.data;
    this.states = this.mapdata.states;

    this.container = $("#" + VERA.mapdata.mapid);

    this.mapwrap = this.container.find(".map_inner_wrap");
    this.title = this.container.find(".map__title");
    this.titleWrap = this.container.find(".map__title_wrap");
    this.content = this.container.find(".map__content");
    this.overview = this.container.find(".map__overview");
    this.back = this.container.find(".back");
    this.tooltip = this.container.find(".tooltip");
    this.tooltiptitle = this.tooltip.find(".title");
    this.tooltipsubtitle = this.tooltip.find(".subtitle");
    this.loader = this.container.find(".streamloader");

    this.stateSelect = this.container.find(".state_select");
    this.markerSelect = this.container.find(".marker_select");
    this.tempSelect = this.container.find(".map_select__temp");

    //this.prevMarkerButton = this.container.find('.js-marker-prev');
    this.nextMarkerButton = this.container.find(".js-marker-next");

    this.stateLegend = this.container.find(".map__legend--state");
    this.markerLegend = this.container.find(".map__legend--marker");

    this.translate = [0, 0];
    this.scale = 1;

    var stateidprefix = "state_";

    this.init = function () {
      // http://bsouthga.github.io/d3-exploder/us.json
      // /dist/map/us-states.json
      self.loader.removeClass("hidden");

      d3.json("/dist/map/us.json", function (error, us) {
        if (error) throw error;

        self.data = us;

        //States
        self.g = self.svg
          .append("g")
          .attr("class", "states")
          .selectAll("path")
          .data(topojson.feature(self.data, self.data.objects.states).features)
          .enter()
          .append("g")
          .attr("class", "state")
          .append("path")
          .attr("d", self.path)
          .each(function (d) {
            d.id = stateidprefix + parseInt(d.id);

            var $state = $(this);

            var i = 0,
              l = self.states.length,
              matched = false;

            for (; i < l; i++) {
              if (self.states[i].stateid == d.id) {
                matched = true;
                break;
              }
            }

            var g = this.parentNode;
            g.setAttribute("data-state", d.properties.name);

            this.id = d.id;
            this.setAttribute("data-name", d.properties.name);
            this.setAttribute("data-abbr", d.properties.code);

            this.setAttribute("title", d.properties.name);

            $state.addClass("state__path");

            if (matched) {
              d.entryId = self.states[i].entryid;
              d.title = d.properties.name;
              d.subtitle = self.states[i].subtitle;
              d.body = self.states[i].body;
              d.level = self.states[i].level;
              d.data = self.states[i].data;

              $state.addClass("state__is-active");

              if (self.states[i].toggleGroup) {
                this.setAttribute(
                  "data-toggle-group",
                  self.states[i].toggleGroup
                );
                d.toggleGroup = self.states[i].toggleGroup;
              }

              if (self.states[i].group && self.states[i].group !== "none") {
                g.setAttribute("in-group", "");
                $state.addClass("state__" + self.states[i].group);
              }
              $(this).on("mouseover", function (e) {
                if (
                  (!self.options.zoom && screen.width > 1024) ||
                  (!self.container.hasClass(activeClass) && screen.width > 1024)
                ) {
                  showTooltip(this, e);
                }
              });
              $(this).on("mouseleave", hideTooltip);
            } else {
              $state.addClass("state__is-not-active");
            }
          });

        self.container.find(".state[in-group]").each(function () {
          self.svg.select(".states").node().appendChild(this);
        });

        //Markers
        if (VERA.mapdata.hasMarkers) {
          self.markers = self.svg.append("g");
          self.markers
            .attr("class", "markers")
            .selectAll("g")
            .data(self.states)
            .enter()
            .append("g")
            .attr("data-state", function (d) {
              return d.title;
            })
            .selectAll("path")
            .data(function (d) {
              return d.markers;
            })
            .enter()
            .append("g")
            .attr("data-title", function (d) {
              return d.title;
            })
            .selectAll("path")
            .data(function (d) {
              return typeof d.dots !== "undefined" ? d.dots : false;
            })
            .enter()
            .append("path")
            .datum(function (d) {
              var parent = d3.select(this.parentNode).datum();
              var point = {
                type: "Point",
                coordinates: self.projection([d.coords.lng, d.coords.lat]),
                title: parent.title,
                subtitle: d.subtitle ? d.subtitle : parent.subtitle,
                id: parent.id,
                group: parent.group,
              };
              return point;
            })
            .attr("d", function (d) {
              if (d.coordinates) {
                //return 'M 0 0 a '+markersize+' '+markersize+' 0 1 0 .000000001z';
                return (
                  "M " +
                  markersize +
                  " 0 a " +
                  markersize +
                  " " +
                  markersize +
                  " 0 1 0 0.00001 0z"
                );
              } else {
                console.warn("no coords for " + d.title);
              }
            })
            .attr("transform", function (d) {
              if (d.coordinates) {
                d.startx = d.coordinates[0];
                d.starty = d.coordinates[1];
                d.initialTransform =
                  "translate(" +
                  (d.coordinates[0] - markersize / 2) +
                  "," +
                  (d.coordinates[1] - markersize / 2) +
                  ")";
                return d.initialTransform;
              }
            })
            //.attr("style", "transform-origin: "  + "px " + markersize/2 + "px")
            .attr("id", function (d) {
              return d.id;
            })
            .attr("title", function (d) {
              return d.title;
            })
            .attr("stroke-linecap", "square")
            .attr("class", function (d) {
              return "marker" + " marker__" + d.group;
            })
            .on("mouseover", function (e) {
              if (screen.width > 1024) {
                var siblings = $(self.container).find(
                  '.marker[title="' + this.getAttribute("title") + '"]'
                );
                siblings.addClass("hovered");
                showTooltip(this, e);

                var $group = self.container
                  .find(
                    '.markers g[data-title="' +
                      this.getAttribute("title") +
                      '"]'
                  )
                  .first();
                $group.parent().append($group);
              }
            })
            .on("mouseleave", function () {
              if (screen.width > 1024) {
                var siblings = $(self.container).find(
                  '.marker[title="' + this.getAttribute("title") + '"]'
                );
                siblings.removeClass("hovered");
                hideTooltip();
              }
            });

          setTimeout(checkUrl, 300);
        }

        self.svg
          .selectAll(".state__path.state__is-active")
          .on("click", function () {
            if ($(this).hasClass(activeClass)) {
              //$(this).removeClass('zoomed')
              reset();
            } else {
              self.stateSelect.val(this.id);
              self.stateSelect.trigger("change");
            }
          });

        self.svg
          .selectAll(".state__path.state__is-not-active")
          .on("click", function () {
            reset();
          });

        self.svg.selectAll(".marker").on("click", function () {
          self.markerSelect.val(this.id);
          self.markerSelect.trigger("change");
        });

        self.svg.on("click", function () {
          //self.goBack();
          //reset();
        });

        self.back.on("click", function () {
          while (self.currentBackTo) {
            self.goBack();
          }
        });

        //self.prevMarkerButton.on("click",self.prevMarker);
        self.nextMarkerButton.on("click", function () {
          $(this).blur();
          self.nextMarker();
        });

        self.stateSelectMenu = new selectMenu(
          self.container.find(".state_select_menu").first(),
          self.stateSelect
        );

        self.stateSelect
          .removeAttr("disabled")
          .on("mousedown", function (e) {
            if (screen.width > 1024) {
              e.preventDefault();
              e.stopPropagation();
              this.blur();
              self.stateSelectMenu.toggle();
            }
          })
          .on("click", function (e) {
            e.stopPropagation();
          })
          .on("change", function (e) {
            var id = $(this).val();
            var path = self.svg.select("#" + id);
            if (id === self.mapdata.country.entryid) {
              self.useData(findData(id));
            } else {
              clicked(path);
            }
            resizeSelects();
          });

        self.markerSelectMenu = new selectMenu(
          self.container.find(".marker_select_menu").first(),
          self.markerSelect
        );

        self.markerSelect
          .removeAttr("disabled")
          .on("mousedown", function (e) {
            if (screen.width > 1024) {
              e.preventDefault();
              e.stopPropagation();
              this.blur();
              self.markerSelectMenu.toggle();
            }
          })
          .on("click", function (e) {
            e.stopPropagation();
          })
          .on("change", function () {
            var id = $(this).val();
            if (id === "none") {
              self.goBack();
            } else {
              var path = self.svg.select("#" + id);
              markerClicked(path);
            }
            resizeSelects();
          });
        resizeSelects();
        var svg = self.mapwrap.find("svg.project-map-svg");
        var width = svg.width();
        var height = svg.height();
        svg.attr("width", width).attr("height", height);

        window.addEventListener("resize", function () {
          //determineOverflow();
          resizeSelects();

          var svg = self.mapwrap.find("svg.project-map-svg");
          var width = svg.width();
          var height = svg.height();
          svg.attr("width", width).attr("height", height);
        });
        //determineOverflow();

        self.loader.addClass("hidden");

        if (options.callback) {
          self.callback = options.callback;
          self.callback();
        }

        var maploaded = document.createEvent("Event");
        maploaded.initEvent("maploaded", true, true);
        window.dispatchEvent(maploaded);

        if (self.options.zoomState) {
          self.clonesvg = clone(self.svg.node());
          var svgclone = self.clonesvg.node();

          var blur = { value: "blur(0px)" };

          blurCloneMap = new TimelineMax({ paused: true });
          blurCloneMap.to(svgclone, transitionTime / 1000, { autoAlpha: 0.3 });
          blurCloneMap.to(
            blur,
            transitionTime / 1000,
            {
              value: "blur(10px)",
              onUpdate: function () {
                svgclone.style.filter = blur.value;
              },
            },
            0
          );
          window.a = blurCloneMap;

          var maps = self.container.find(".project-map-svg");

          maps.each(function (i) {
            var $this = $(this);
            if (i === 0) {
              $this.find(".state__path").css({ transition: "none" });
            }
            $this.css({ zIndex: maps.length - i });
          });
        }
      });
    };

    this.interacted = false;
    this.firstInteraction = function () {
      self.interacted = true;
    };

    this.goBack = function () {
      $(self.container).find(".marker.active").removeClass("active");
      if (self.currentBackTo) {
        if (typeof self.currentBackTo._groups !== "undefined") {
          self.useData(self.currentBackTo.datum(), self.mapdata.country);
        } else {
          self.useData(findData(self.currentBackTo.entryid));
        }
      }
    };

    this.nextMarker = function () {
      var node = self.currentMarker.node();
      var parent = node.parentNode;
      var newMarker = parent.parentNode.firstChild.firstChild;
      markerClicked(d3.select(newMarker));
      self.markerSelect.val(newMarker.id);
      resizeSelects();
    };

    this.surfaceStates = function (group) {
      self.container
        .find('.state__path[data-toggle-group="' + group + '"]')
        .each(function () {
          self.svg.select(".states").node().appendChild($(this).parent()[0]);
        });
    };

    var selectMenu = function ($menu, $select) {
      var innerself = this;

      this.menu = $menu;

      this.toggle = function () {
        if (innerself.menu.hasClass("open")) {
          innerself.close();
        } else {
          innerself.open();
        }
      };

      this.open = function () {
        closeMenu();
        innerself.menu.addClass("open");
        $("body").one("click", innerself.close);
      };

      this.close = function () {
        innerself.menu.removeClass("open");
        $("body").off("click", innerself.close);
      };

      this.initButtons = function () {
        innerself.menu.find(".map_select_button").on("click", function () {
          $select.val(this.dataset.option);
          $select.trigger("change");
          innerself.close();
        });
      };

      this.initButtons();
    };

    function closeMenu() {
      self.container.find(".map_select_menu.open").removeClass("open");
    }

    function showTooltip(elem, event) {
      if (window.innerWidth > 1024) {
        if (elem.getAttribute("class").indexOf("marker") !== -1) {
          var d = d3.select(elem).datum();
          var bbox = elem.getBBox();
          var scaler = markersize;
          var center = [
            d.startx - scaler + bbox.width / 2,
            d.starty - scaler + bbox.height / 2,
          ];
        } else {
          var center = self.path.centroid(d3.select(elem).datum());
        }

        var xscale = self.mapwrap.outerWidth() / width;
        var yscale = self.mapwrap.outerHeight() / height;

        self.tooltip.css({
          top: (center[1] * self.scale + self.translate[1] - 15) * yscale,
          left: (center[0] * self.scale + self.translate[0]) * xscale,
        });
        var data = d3.select(elem).datum();
        self.tooltiptitle.html(data.title);
        self.tooltipsubtitle.html(data.subtitle);
        if (
          !data.subtitle ||
          (typeof data.subtitle === "String" && data.subtitle.strip() === "")
        ) {
          self.tooltipsubtitle.addClass("hide");
        } else {
          self.tooltipsubtitle.removeClass("hide");
        }
        self.tooltip.addClass("show");
      }
    }

    function hideTooltip() {
      self.tooltip.removeClass("show");
    }

    function findData(id) {
      if (self.mapdata.country.entryid == id) {
        return self.mapdata.country;
      }

      var stack = self.mapdata.states;
      var i = 0,
        l = stack.length;
      for (; i < l; i++) {
        if (stack[i].entryid == id) {
          return stack[i];
        }
        if (Array.isArray(stack[i])) {
          var stack = stack[i];
          var i = 0;
          l = stack.length;
          for (; i < l; i++) {
            if (stack[i].entryid == id) {
              return stack[i];
            }
          }
        }
      }
      return false;
    }

    function checkUrl() {
      if (window.location.href.indexOf("selectmap=") > 0) {
        var params = window.location.href.split("selectmap=")[1];
        var stateId = params ? params.split(":")[0] : null;
        var markerId = params ? params.split(":")[1] : null;

        if (stateId) {
          var statePath = self.svg.select("#state_" + stateId);
          clicked(statePath);

          var map = self.svg.node();
          window.scrollTo(0, $(map).offset().top);

          if (markerId) {
            var markerPath = self.svg.select("#marker_" + markerId);
            setTimeout(function () {
              markerClicked(markerPath);
            }, 100);
          }
        }
      }
    }

    function clicked(path) {
      self.firstInteraction();
      if (d3.event) {
        //d3.event.stopPropagation();
      }
      console.log("click");
      hideTooltip();

      closeMenu();
      if (active.node() && path.node()) {
        active.classed(activeClass, false);

        if (active.node().id === path.node().id) {
          return self.goBack();
        } else {
          /*
					while (self.currentBackTo) {
						self.goBack();
					}
					if (d3.event) {
						return;
					}
*/
        }
      }

      var d = path.datum();

      var data = findData(d.entryId);
      self.markerSelect.find(":not([value=none])").remove();
      self.markerSelectMenu.menu
        .find('.map_select_button:not([data-option="none"])')
        .parent()
        .remove();
      data.markers.forEach(function (marker) {
        self.markerSelect.append(
          '<option value="' + marker.id + '">' + marker.title + "</option>"
        );
        self.markerSelectMenu.menu.append(
          '<div class="map_select_button_wrap"><button class="map_select_button" data-option="' +
            marker.id +
            '">' +
            marker.title +
            "</button></div>"
        );
        self.markerSelectMenu.initButtons();
      });

      if (self.markerSelect.find("option").length <= 1) {
        self.markerSelect.addClass("hide");
      } else {
        self.markerSelect.removeClass("hide");
      }

      active.classed(activeClass, false);
      active = path.classed(activeClass, true);

      if (self.options.zoom) {
        zoom();
      }

      self.surfaceStates(d.toggleGroup);
      setTimeout(function () {
        self.useData(d, determineBackTo(d));
      }, 100);

      var markersSelector = '.markers g[data-state="' + d.title + '"] .marker';
      var $markers = $(markersSelector);

      $(".markers .marker").removeClass("marker__selectable");
      $markers.addClass("marker__selectable");
      if (!data.body || data.body.trim() == "") {
        if ($markers.length) {
          var marker = d3.select(markersSelector);
          self.markerSelect.val(marker.datum().id);
          setTimeout(function () {
            self.markerSelect.trigger("change");
          }, 100);
        }
      }

      self.stateLegend.attr("aria-hidden", true);
      self.markerLegend.attr("aria-hidden", false);

      self.container.addClass(activeClass);

      function zoom() {
        var bounds = self.path.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale =
            (self.options.zoomRatio * 0.9) / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

        if (self.options.zoomState) {
          self.svg.selectAll(".state__path").attr("opacity", 0);

          active.attr("opacity", 1);

          blurCloneMap.play();
        }

        self.svg
          .selectAll(".states,.markers")
          .transition()
          .duration(transitionTime)
          .attr(
            "transform",
            "translate(" + translate + ") scale(" + scale + ")"
          );

        self.svg.selectAll(".marker").attr("transform", function (d) {
          if (d.initialTransform) {
            var thescale =
              "scale(" +
              (window.innerWidth > 1024 ? 1 / scale : (1 / scale) * 1.5) +
              ")";
            var scaler = markersize / scale;
            var transform =
              "translate(" +
              (d.startx - scaler) +
              " " +
              (d.starty - scaler) +
              ") " +
              thescale;
            return transform;
          }
        });

        self.translate = translate;
        self.scale = scale;
      }
    }

    function reset() {
      self.stateSelect.val(self.stateSelect.find("option:first").val());

      closeMenu();

      $(".markers .marker").removeClass("marker__selectable");

      active.classed(activeClass, false);
      active = d3.select(null);
      self.svg
        .selectAll(".states,.markers")
        .transition()
        .duration(transitionTime)
        .attr("transform", "")
        .on("end", function (d) {
          self.svg.selectAll(".state__path").attr("opacity", 1);
        });

      self.svg.selectAll(".marker").attr("transform", function (d) {
        if (d.initialTransform) {
          return d.initialTransform;
        }
      });

      if (self.options.zoomState) {
        blurCloneMap.reverse();
      }

      self.container.removeClass(activeClass);

      self.translate = [0, 0];
      self.scale = 1;

      self.stateLegend.attr("aria-hidden", false);
      self.markerLegend.attr("aria-hidden", true);

      resizeSelects();
    }

    function markerClicked(path) {
      if (d3.event) {
        d3.event.stopPropagation();
      }

      self.currentMarker = path;

      var d = d3.select(path.node().parentNode).datum();

      var siblings = $(self.container).find(
        '.marker[title="' + path.node().getAttribute("title") + '"]'
      );
      $(self.container).find(".marker.active").removeClass("active");
      siblings.addClass("active");

      var $group = self.container
        .find(
          '.markers g[data-title="' + path.node().getAttribute("title") + '"]'
        )
        .first();
      $group.parent().append($group);

      self.useData(d, determineBackTo(d));

      if (active.node() && d) {
        var statenum = active.node().id.split("_")[1];
        var markerid = d.id.split("_")[1];
        var currPath = window.location.href;
        var noquerystring = currPath.indexOf("?") === -1;
        var updatedPath = currPath
          .split("selectmap=")[0]
          .concat(
            (noquerystring ? "?" : "") +
              "selectmap=" +
              statenum +
              ":" +
              markerid
          );
        window.history.pushState({}, "", updatedPath);
      }
    }

    function determineBackTo(result) {
      switch (result.level) {
        case 1:
          return self.mapdata.country;
          break;
        case 2:
          var state = d3
            .select("#" + result.id)
            .node()
            .parentNode.parentNode.getAttribute("data-state");
          var data = d3.select('.state__path[data-name="' + state + '"]');
          if (!data.datum().body) {
            return self.mapdata.country;
          }
          return data;
          break;
        default:
          return null;
      }
    }

    function resizeSelect($select, $temp, other) {
      other = other || null;

      $temp.html($select.find("option:selected").clone());
      if ($select.hasClass("as-title")) {
        $temp.addClass("as-title");
      } else {
        $temp.removeClass("as-title");
      }

      var width = $temp.width();

      if (other) {
        var diff = $select.parent().outerWidth(true) - $select.parent().width();
        var maxwidth =
          other.container.outerWidth(true) -
          other.select.outerWidth(true) -
          diff;

        if ($temp.outerWidth(true) > maxwidth) {
          width = maxwidth - ($select.outerWidth(true) - $select.width());
          var $parent = $select.parent();
          width -= diff;
        }
      }

      if ($(window).width() <= 768) {
        width = "100%";
      }

      $select.width(width);
    }

    function resizeSelects() {
      resizeSelect(self.stateSelect, self.tempSelect);
      resizeSelect(self.markerSelect, self.tempSelect);
    }

    function clone(node) {
      return d3.select(
        node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling)
      );
    }

    self.init();
  };
})(window);
