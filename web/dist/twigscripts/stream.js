(function () {
  var nullTest = /^\s*null/;

  var Stream = {
    init: function (options) {
      Stream.content.container = document.getElementById("stream-content");
      Stream.content.loader = document.getElementById("content_loader");
      Stream.content.noresults = $("#stream-content")
        .parent()
        .find(".no_results")[0];
      Stream.content.nomore = $("#stream-content").parent().find(".no_more")[0];
      Stream.map = { container: document.getElementById("stream-map") };
      Stream.options = options;
      this.filter.init();

      var isEmpty =
        Stream.content.container.querySelector(".stream-module") == null;
      if (isEmpty) {
        Stream.content.noresults.classList.remove("hidden");
      }

      //For Packery
      if (
        Stream.options.streamType == "content" &&
        typeof Stream.options.nopack === "undefined"
      ) {
        window.addEventListener("resize", function () {
          if (window.resizeTimer) {
            clearTimeout(window.resizeTimer);
          }
          window.resizeTimer = setTimeout(function () {
            if ("undefined" !== typeof Stream.pack && !Stream.pack.unpacked) {
              Stream.content.resizeBlocks();
            }
          }, 100);
        });
      }

      //Lazy Load
      window.addEventListener("scroll", function () {
        if (options.news) {
          Stream.checkIfMoreNeeded(Stream.news);
        }
        Stream.checkIfMoreNeeded(Stream.content);
      });
    },
    lazyincrement: 1,
    lazylimit: 1,
    loadmorebtn: null,
    content: {
      offset: 1,
      tapped: false,
      isgrid: false,
      currentParams: {},
      determineParams: function () {
        var relations = [];
        $(".relation_checkbox:checked").each(function () {
          relations.push({
            id: this.value,
            type: this.dataset.type,
            category: this.dataset.category,
          });
        });

        var fields = [];
        $(".field_checkbox:checked").each(function () {
          fields.push(JSON.parse('"' + this.dataset.option + '"'));
        });

        var permissions = [];
        $(".permission_checkbox:checked").each(function () {
          permissions.push({ id: this.value, type: this.dataset.type });
        });

        // if (relations.length == 0) {
        //   if (Stream.primaryRelation != null) {
        //     relations.push(Stream.primaryRelation);
        //     var nofilterrelation = true;
        //   } else {
        //     relations = null;
        //   }
        // }

        var sections = [];
        $(".section_checkbox:checked").each(function () {
          sections.push(this.value);
        });
        if (sections.length == 0) {
          $(".section_checkbox").each(function () {
            sections.push(this.value);
          });
          var nosectionrelation = true;
        }

        var types = [];
        var reference = {
          knowledgeBlog: { type: "post", section: "blogPosts" },
          knowledgeVideo: {
            type: ["video", "videoPlaylist"],
            section: "video",
          },
          knowledgeNews: { type: "news", section: "news" },
          knowledgePublication: {
            type: "publicationOverview",
            section: "publications",
          },
        };

        $(".type_checkbox:checked").each(function () {
          types.push(this.value);

          if (typeof reference[this.value] !== "undefined") {
            if (!Array.isArray(reference[this.value]["type"])) {
              reference[this.value]["type"] = [reference[this.value]["type"]];
            }
            var i,
              l = reference[this.value]["type"].length;
            for (i = 0; i < l; i++) {
              types.push(reference[this.value]["type"][i]);
            }
          }
        });

        if (Stream.options.hiddenSections !== undefined) {
          var i,
            l = Stream.options.hiddenSections.length;
          for (i = 0; i < l; i++) {
            sections.push(Stream.options.hiddenSections[i]);
          }
        }

        if (types.length == 0) {
          types.push(Stream.options.entryType);
          var notyperelation = true;
        }

        var startyear = parseInt($("#filter__year-from").val());
        var endyear = parseInt($("#filter__year-to").val());

        var query = $("#search").val();

        if (query.trim() == "") {
          var excludethem = true;
        }

        if (Stream.fieldSearch) {
          query = Stream.fieldSearch + " " + query;
        }

        var params = {
          relations: relations,
          permissions: permissions,
          sections: sections,
          offset: Stream.content.offset,
          startYear: startyear,
          endYear: endyear,
          limit: Stream.content.limit,
          streamType: Stream.options.streamType,
          type: types,
          fields: fields,
          moduleType: Stream.options.moduleType,
        };

        if (query != "") {
          params.query = query;
        }

        if (
          Stream.content.exclude &&
          "undefined" !== typeof excludethem &&
          excludethem
        ) {
          params.exclude = Stream.content.exclude;
        }

        if (
          Stream.content.keyResources &&
          $('.filter--sortby a[data-sort="key"].active').length
        ) {
          params.keyResources = Stream.content.keyResources;
        }

        if (
          Stream.options.showArchived != "undefined" &&
          Stream.options.showArchived == true
        ) {
          params.showArchived = Stream.options.showArchived;
        }

        if (typeof Stream.options.fieldValues != "undefined") {
          params.fieldValues = Stream.options.fieldValues;
        }

        var queryparams = _.cloneDeep(params);

        if (
          "undefined" !== typeof nofilterrelation
          //&& nofilterrelation
        ) {
          delete queryparams.relations;
        }
        if ("undefined" !== typeof nosectionrelation && nosectionrelation) {
          delete queryparams.sections;
        }
        if ("undefined" !== typeof notyperelation && notyperelation === true) {
          delete queryparams.type;
        }

        if (
          (isNaN(queryparams.startYear) && isNaN(queryparams.endYear)) ||
          (queryparams.startYear == Stream.content.daterange.start &&
            queryparams.endYear == Stream.content.daterange.end)
        ) {
          delete queryparams.startYear;
          delete queryparams.endYear;
        }

        if (
          queryparams.relations === null ||
          queryparams.relations.length === 0
        ) {
          delete queryparams.relations;
        }

        if (queryparams.fields.length == 0) {
          delete queryparams.fields;
        }

        if (Array.isArray(queryparams.keyResources)) {
          queryparams.keyResources = true;
        }

        delete queryparams.showArchived;

        delete queryparams.offset;
        delete queryparams.limit;
        delete queryparams.streamType;

        delete queryparams.moduleType;
        delete queryparams.exclude;

        delete queryparams.permissions;

        if ($("a[data-viewtype=list].active").length) {
          queryparams.list = true;
        }

        return [params, queryparams];
      },
      load: function (clear) {
        var bothparams = Stream.content.determineParams();

        var params = bothparams[0];

        var queryparams = bothparams[1];

        if (clear && _.isEqual(params, Stream.content.currentParams)) {
          return;
        }

        Stream.content.currentParams = params;

        Stream.content.loading = true;

        if (clear) {
          Stream.content.offset = 0;
          params.offset = 0;
          Stream.content.clear();
          $(Stream.content.container)
            .parent()
            .find(".no_results, .no_more")
            .each(function () {
              $(this).addClass("hidden");
            });
          Stream.content.tapped = false;
        }

        if (Stream.loadmorebtn) {
          $(Stream.loadmorebtn).remove();
          Stream.loadmorebtn = null;
        }

        if (Stream.content.currentRequest) {
          if (Array.isArray(Stream.content.currentRequest)) {
            for (var i = 0; i < Stream.content.currentRequest.length; i++) {
              Stream.content.currentRequest[i].abort();
            }
          } else {
            Stream.content.currentRequest.abort();
          }
        }

        if (clear && Stream.pack && Stream.content.isgrid === false) {
          $(Stream.content.container).css("height", "auto");
        }

        Stream.content.loader.classList.remove("hidden");

        var first = true;
        var querystring = "?";
        for (var key in queryparams) {
          // skip loop if the property is from prototype
          if (!queryparams.hasOwnProperty(key)) continue;

          var obj = queryparams[key];

          var query = "";

          if (first === false) {
            query += "&";
          }

          if ("object" === typeof obj) {
            if (obj && Array.isArray(obj) && "object" === typeof obj[0]) {
              var string = "";
              for (var i = 0; i < obj.length; i++) {
                string += encodeURIComponent(JSON.stringify(obj[i]));
                if (i != obj.length - 1) {
                  string += ",";
                }
              }
              obj = string;
            } else {
              obj = encodeURI(obj);
            }
          }

          query += key + "=" + obj;

          querystring += query;

          if (first === true) {
            first = false;
          }
        }

        if (querystring == "?") {
          querystring = "";
        }

        var newurl =
          window.location.origin + window.location.pathname + querystring;
        var stateObj = { query: newurl };
        history.replaceState(stateObj, "", newurl);

        if (Stream.options.streamType == "newsroom") {
          if (clear) {
            $("#newscol").find(".stream-thing").remove();
            $("#presscol").find(".stream-thing").remove();
          }

          var newsparams = $.extend(false, { newsSection: "news" }, params);

          var pressparams = $.extend(
            false,
            { newsSection: "pressReleases", notype: true },
            params
          );

          Stream.content.currentRequest = [];

          $.when(
            (Stream.content.currentRequest[0] = $.post(
              "/includes/stream/news",
              newsparams
            )),
            (Stream.content.currentRequest[1] = $.post(
              "/includes/stream/news",
              pressparams
            ))
          )

            .done(function (news, press) {
              var newsContent = news[0];
              var pressContent = press[0];

              var newsIsNull = nullTest.test(newsContent);
              var pressIsNull = nullTest.test(pressContent);

              if (newsIsNull && pressIsNull) {
                Stream.content.tapped = true;
              }
              if (newsIsNull) {
                newsContent = "";
                if (clear) {
                  $("#newscol").find(".no_results").removeClass("hidden");
                } else {
                  $("#newscol").find(".no_more").removeClass("hidden");
                }
              }

              if (newsContent) {
                $(newsContent).insertBefore($("#newscol .no_results"));
              }

              if (pressIsNull) {
                pressContent = null;
                if (clear) {
                  $("#presscol").find(".no_results").removeClass("hidden");
                } else {
                  $("#presscol").find(".no_more").removeClass("hidden");
                }
              }

              if (pressContent) {
                $(pressContent).insertBefore($("#presscol .no_results"));
              }

              Stream.afterLoad(Stream.content);
            })

            .fail(function (message) {
              console.warn(message);
              //Stream.error(Stream.content);
            });
        } else {
          if (
            (isNaN(params.startYear) && isNaN(params.endYear)) ||
            (params.startYear == Stream.content.daterange.start &&
              params.endYear == Stream.content.daterange.end)
          ) {
            delete params.startYear;
            delete params.endYear;
          }
          Stream.content.currentRequest = $.post(
            Stream.content.partial,
            params,
            function (data) {
              Stream.content.append(data, clear);
            }
          ).fail(function (message) {
            console.warn(message);
            // Stream.error(Stream.content);
          });
        }
      },
      append: function (data, clear) {
        if (clear) {
          Stream.content.clear();
        }

        var dataIsNull = nullTest.test(data);
        var $data;

        $(Stream.content.container).find("li.empty").remove();

        if (!dataIsNull) {
          //Add Content
          $data = $(data);

          if (
            Stream.options.streamType == "people" &&
            $(Stream.content.container).find("ul").length > 0
          ) {
            $(Stream.content.container).find("ul").append($data);
          } else {
            if ($(Stream.content.container).find(".grid-sizer").length > 0) {
              $data.insertBefore(
                $(Stream.content.container).find(".grid-sizer")
              );
            } else if (
              $(Stream.content.container).find(".no_results").length > 0
            ) {
              $data.insertBefore(
                $(Stream.content.container).find(".no_results")
              );
            } else {
              $(Stream.content.container).append($data);
            }
          }
        }

        var streamthings, tapit;

        streamthings = $(Stream.content.container).find(".stream-thing").length;

        if (Stream.options.streamType == "people" && streamthings > 0) {
          streamthings--;
        }

        tapit =
          dataIsNull ||
          streamthings == 0 ||
          streamthings % Stream.content.limit != 0;

        if (tapit) {
          Stream.content.tapped = true;
          if (Stream.content.offset == 0 && streamthings == 0) {
            Stream.content.noresults.classList.remove("hidden");
          } else if (Stream.content.offset > 0) {
            Stream.content.nomore.classList.remove("hidden");
          }
        }

        if (Stream.pack && Stream.content.isgrid == false && $data) {
          Stream.pack.one("layoutComplete", function () {
            setTimeout(function () {
              Stream.content.repack();
              Site.scrollTo();
            }, 1000);
          });
          Stream.pack.isotope("appended", $data);
          Stream.content.resizeBlocks();
          Stream.pack.isotope("layout");
        }

        Stream.afterLoad(Stream.content);
      },
      clear: function () {
        $(Stream.content.container).find(".stream-thing").remove();
        // .each(function () {
        //   $(this).remove();
        // });
      },
      resizeBlocks: function () {
        var $blocks = $(Stream.content.container).find(
          ".stream-thing.mason-block"
        );
        var newheight = 0;
        $blocks.each(function () {
          $(this).css("height", "auto");
        });
        $blocks.each(function () {
          var thisheight = $(this).height();
          if (thisheight > newheight) {
            newheight = thisheight;
          }
        });
        $blocks.each(function () {
          $(this).css("height", newheight + "px");
        });
      },
      repack: function () {
        Stream.content.container.classList.add("packed");

        Stream.content.resizeBlocks();

        Stream.pack = $(Stream.content.container).isotope({
          itemSelector: ".mason-block",
          percentPosition: true,
          layoutMode: "packery",
          hiddenStyle: {
            transform: "scale(0.001)",
          },
          visibleStyle: {
            transform: "scale(1)",
          },
          packery: {
            columnWidth: ".grid-sizer",
            gutter: ".gutter-sizer",
          },
        });

        Stream.pack.unpacked = false;
      },
      unpack: function () {
        Stream.pack.unpacked = true;
        Stream.pack.isotope("destroy");
        $(Stream.content.container).css("height", "auto");
        var $blocks = $(Stream.content.container).find(".stream-thing");
        $blocks.each(function () {
          $(this).css("height", "auto");
        });
        Stream.content.container.classList.remove("packed");
      },
    },
    afterLoad: function (stream) {
      Site.scrollTo();
      stream.offset++;
      stream.loading = false;
      stream.loader.classList.add("hidden");
    },
    error: function (stream) {
      stream.loading = false;
      stream.loader.classList.add("hidden");
    },
    news: {
      container: document.getElementById("news-content"),
      loader: document.getElementById("news_loader"),
      offset: 1,
      load: function () {
        Stream.news.loading = true;
        Stream.news.loader.classList.remove("hidden");

        Stream.news.currentRequest = $.post(
          "/includes/stream/news",
          {
            relation: Stream.primaryRelation,
            offset: Stream.news.offset,
            limit: Stream.news.limit,
          },
          function (data) {
            //Add content
            $(data).insertBefore(
              $(Stream.news.container).find(".streamloader")[0]
            );

            Stream.afterLoad(Stream.news);
          }
        ).fail(function (message) {
          console.warn(message);
          //Stream.error(Stream.news);
        });
      },
    },

    checkIfMoreNeeded: function (stream) {
      var modules = $(stream.container).find(".stream-thing").length;
      //Check if the stream is full before loading more content to avoid duplicates
      if (modules >= stream.limit) {
        this.lazyLoad(stream);
      }
    },

    lazyLoad: function (stream) {
      var lazyOffset = 300;

      var scroll = window.scrollY + window.innerWidth;
      var bottom =
        $(stream.container).offset().top + $(stream.container).height();

      if (
        scroll >= bottom - lazyOffset &&
        stream.offset < Stream.lazylimit &&
        !stream.loading &&
        !stream.tapped
      ) {
        stream.load();
      } else if (
        Stream.content.offset == Stream.lazylimit &&
        ("undefined" === typeof Stream.options.news ||
          Stream.options.news == false ||
          Stream.news.offset == Stream.lazylimit) &&
        !Stream.content.tapped &&
        !Stream.loadmorebtn
      ) {
        var loadmorebtn = document.createElement("button");
        loadmorebtn.textContent = "Load More";
        loadmorebtn.id = "load_more_btn";
        loadmorebtn.classList.add("btn");
        loadmorebtn.addEventListener("click", function () {
          Stream.loadMore();
        });
        if ($("#load-more-container").length > 0) {
          $("#load-more-container").append(loadmorebtn);
        } else {
          $("#stream .container").not("#stream-map").append(loadmorebtn);
        }
        Stream.loadmorebtn = loadmorebtn;
      }
    },

    loadMore: function () {
      Stream.lazylimit += Stream.lazyincrement;
      Stream.content.load();

      if (
        "undefined" !== typeof Stream.options.news &&
        Stream.options.news != false
      ) {
        Stream.news.load();
      }
      $(Stream.loadmorebtn).remove();
      Stream.loadmorebtn = null;
    },

    filter: {
      init: function () {
        this.timer = null;

        this.from = document.getElementById("filter__year-from");
        if (this.from) {
          this.from.options = document.querySelectorAll(
            "#filter__year-from option"
          );
          this.from.addEventListener("change", function () {
            var from = $(this).val();
            $(Stream.filter.to.options).each(function () {
              this.disabled = this.value < from;
            });
            if ($(Stream.filter.to).val() < from) {
              $(Stream.filter.to).val(from);
            }
          });
        }

        this.to = document.getElementById("filter__year-to");
        if (this.to) {
          this.to.options = document.querySelectorAll(
            "#filter__year-to option"
          );
          this.to.addEventListener("change", function () {
            var to = $(this).val();
            $(Stream.filter.from.options).each(function () {
              this.disabled = this.value > to;
            });
            if ($(Stream.filter.from).val() > to) {
              $(Stream.filter.from).val(to);
            }
          });
        }

        this.sortBy = document.querySelectorAll(".filter--sortby a");

        $(this.sortBy).each(function () {
          $(this).on("click", function (e) {
            e.preventDefault();
            $(Stream.filter.sortBy).removeClass("active");
            $(this).addClass("active");
            Stream.filter.update();
          });
        });

        this.relations = document.querySelectorAll(
          ".type_checkbox,.section_checkbox"
        );

        this.types = document.querySelectorAll(".relation_checkbox");

        this.itac = document.querySelectorAll(".filter-listen");

        this.options = document.querySelectorAll(".field_checkbox");

        this.keyword = document.getElementById("search");

        this.clear = document.getElementById("clear");

        this.fields = [
          this.relations,
          this.types,
          this.options,
          this.clear,
          this.itac,
        ];

        if (this.from && this.to) {
          this.fields.push(this.from, this.to);
        }

        $(Stream.filter.fields).each(function () {
          $(this).on("change", function () {
            Stream.filter.update();
          });
        });

        $(this.clear).on("click", function () {
          Stream.filter.update();
        });

        $(this.keyword).on("keyup", function () {
          if (undefined != typeof this.current && this.current != this.value) {
            Stream.filter.update();
            this.current = this.value;
          }
        });

        if (Stream.filter.callback) {
          Stream.filter.callback();
        }
      },

      fillOut: function (values) {
        //sections
        if (
          Array.isArray(values.sections) &&
          values.sections.length < $(".section_checkbox").length
        ) {
          for (var i = 0; i < values.sections.length; i++) {
            $(".section_checkbox[value=" + values.sections[i] + "]").prop(
              "checked",
              true
            );
          }
        }

        //relations
        if (values.relations) {
          for (var i = 0; i < values.relations.length; i++) {
            $(".relation_checkbox[value=" + values.relations[i].id + "]").prop(
              "checked",
              true
            );
          }
        }

        //fields
        if (values.fields) {
          if (!Array.isArray(values.fields)) {
            values.fields = [values.fields];
          }
          for (var i = 0; i < values.fields.length; i++) {
            $('.field_checkbox[data-option="' + values.fields[i] + '"]').prop(
              "checked",
              true
            );
          }
        }

        //types
        if (values.types) {
          if (!Array.isArray(values.types)) {
            values.types = [values.types];
          }
          for (var i = 0; i < values.types.length; i++) {
            $('.type_checkbox[value="' + values.types[i] + '"]').prop(
              "checked",
              true
            );
          }
        }

        //date
        if (values.date) {
          $(this.from).val(values.date.from);
          $(this.to).val(values.date.to);
          $("#date-slider").slider("values", [
            values.date.from,
            values.date.to,
          ]);
          $("#date-slider .ui-slider-handle:first-of-type").attr(
            "data-year",
            values.date.from
          );
          $("#date-slider .ui-slider-handle:nth-of-type(2)").attr(
            "data-year",
            values.date.to
          );
        }

        //query
        //this.keyword.value = $('div').html(values.query).text();
      },

      update: function () {
        if (Stream.filter.timer) {
          clearTimeout(Stream.filter.timer);
        }

        Stream.filter.timer = setTimeout(function () {
          Stream.content.load(true);
        }, 700);
      },
    },
  };
  window.Stream = Stream;
})();
