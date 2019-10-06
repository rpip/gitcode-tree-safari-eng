'use strict';

var TEMPLATE =
  '<div>\n' +
  '  <nav class="octotree_sidebar">\n' +
  '    <a class="octotree_toggle btn">\n' +
  '      <div class="loader"></div>\n' +
  '      <span></span>\n' +
  '\n' +
  '      <div class="popup">\n' +
  '        <div class="arrow"></div>\n' +
  '        <div class="content">\n' +
  '          GitCodeTree activated. Click here\n' +
  '          <kbd>cmd shift s</kbd> (or <kbd>ctrl shift s</kbd>)\n' +
  '          display.\n' +
  '        </div>\n' +
  '      </div>\n' +
  '    </a>\n' +
  '\n' +
  '    <a class="octotree_opts" href="javascript:void(0)">\n' +
  '      <span></span>\n' +
  '    </a>\n' +
  '\n' +
  '    <div class="octotree_views">\n' +
  '      <div class="octotree_view octotree_treeview current">\n' +
  '        <div class="octotree_view_header"></div>\n' +
  '        <div class="octotree_view_body"></div>\n' +
  '      </div>\n' +
  '\n' +
  '      <div class="octotree_view octotree_errorview">\n' +
  '        <div class="octotree_view_header"></div>\n' +
  '        <form class="octotree_view_body">\n' +
  '          <div class="message"></div>\n' +
  '          <div>\n' +
  '            <input name="token" type="text" placeholder="Please fill in here token" autocomplete="off">\n' +
  '          </div>\n' +
  '          <div>\n' +
  '            <button type="submit" class="btn">Save</button>\n' +
  '            <a href="https://github.com/buunguyen/octotree#access-token" target="_blank" tabIndex="-1">Why do I need to complete token?</a>\n' +
  '          </div>\n' +
  '          <div class="error"></div>\n' +
  '        </form>\n' +
  '      </div>\n' +
  '\n' +
  '      <div class="octotree_view octotree_optsview">\n' +
  '        <div class="octotree_view_header">Setting</div>\n' +
  '        <form class="octotree_view_body">\n' +
  '          <div>\n' +
  '            <label>Site token</label>\n' +
  '            <a class="octotree_help" href="http://git.oschina.net/inu1255/GitCodeTree#Setting" target="_blank" tabIndex="-1">\n' +
  '              <span></span>\n' +
  '            </a>\n' +
  '            <input type="text" data-store="TOKEN" data-perhost="true">\n' +
  '          </div>\n' +
  '\n' +
  '          <div>\n' +
  '            <div>\n' +
  '              <label>Hotkey</label>\n' +
  '            </div>\n' +
  '            <input type="text" data-store="HOTKEYS">\n' +
  '          </div>\n' +
  '\n' +
  '          <div>\n' +
  '            <label><input type="checkbox" data-store="REMEMBER"> Remember to expand/collapse</label>\n' +
  '          </div>\n' +
  '\n' +
  '          <div>\n' +
  '            <label><input type="checkbox" data-store="NONCODE"> Also displayed on pages without code</label>\n' +
  '          </div>\n' +
  '\n' +
  '          <div class="octotree_github_only">\n' +
  '            <label><input type="checkbox" data-store="LOADALL"> Automatic loading</label>\n' +
  '          </div>\n' +
  '\n' +
  '          <div>\n' +
  '            <button type="submit" class="btn">Save</button>\n' +
  '          </div>\n' +
  '        </form>\n' +
  '      </div>\n' +
  '    </div>\n' +
  '  </nav>\n' +
  '</div>\n' +
  '';
('use strict');

var NODE_PREFIX = 'octotree';
var ADDON_CLASS = 'octotree';
var SHOW_CLASS = 'octotree-show';

var STORE = {
  TOKEN: 'octotree.access_token',
  REMEMBER: 'octotree.remember',
  NONCODE: 'octotree.noncode_shown',
  HOTKEYS: 'octotree.hotkeys',
  LOADALL: 'octotree.loadall',
  POPUP: 'octotree.popup_shown',
  WIDTH: 'octotree.sidebar_width',
  SHOWN: 'octotree.sidebar_shown',
  GHEURLS: 'octotree.gheurls.shared',
  GLEURLS: 'octotree.gleurls.shared'
};

var DEFAULTS = {
  TOKEN: '',
  REMEMBER: true,
  NONCODE: true,
  LOADALL: true,
  HOTKEYS: '⌘+⇧+s, ⌃+⇧+s',
  POPUP: false,
  WIDTH: 232,
  SHOWN: false,
  GHEURLS: '',
  GLEURLS: ''
};

var EVENT = {
  TOGGLE: 'octotree:toggle',
  LOC_CHANGE: 'octotree:location',
  LAYOUT_CHANGE: 'octotree:layout',
  REQ_START: 'octotree:start',
  REQ_END: 'octotree:end',
  OPTS_CHANGE: 'octotree:change',
  VIEW_READY: 'octotree:ready',
  VIEW_CLOSE: 'octotree:close',
  FETCH_ERROR: 'octotree:error'
};
('use strict');

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true}
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Adapter = (function() {
  function Adapter(deps) {
    _classCallCheck(this, Adapter);

    deps.forEach(function(dep) {
      return window[dep]();
    });
    this._defaultBranch = {};
  }

  /**
   * Loads the code tree of a repository.
   * @param {Object} opts: {
   *                  path: the starting path to load the tree,
   *                  repo: the current repository,
   *                  node (optional): the selected node (null to load entire tree),
   *                  token (optional): the personal access token
   *                 }
   * @param {Function} transform(item)
   * @param {Function} cb(err: error, tree: Array[Array|item])
   */

  _createClass(Adapter, [
    {
      key: '_loadCodeTree',
      value: function _loadCodeTree(opts, transform, cb) {
        var _this = this;

        var folders = {'': []};
        var $dummyDiv = $('<div/>');
        var path = opts.path,
          repo = opts.repo,
          node = opts.node;

        opts.encodedBranch =
          opts.encodedBranch || encodeURIComponent(decodeURIComponent(repo.branch));

        this._getTree(path, opts, function(err, tree) {
          if (err) return cb(err);

          _this._getSubmodules(tree, opts, function(err, submodules) {
            if (err) return cb(err);

            submodules = submodules || {};

            var nextChunk = function nextChunk() {
              var iteration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

              var CHUNK_SIZE = 300;

              for (var i = 0; i < CHUNK_SIZE; i++) {
                var item = tree[iteration * CHUNK_SIZE + i];

                // we're done
                if (item === undefined) {
                  return cb(null, folders['']);
                }

                // runs transform requested by subclass
                if (transform) {
                  transform(item);
                }

                // if lazy load and has parent, prefix with parent path
                if (node && node.path) {
                  item.path = node.path + '/' + item.path;
                }

                var _path = item.path;
                var type = item.type;
                var index = _path.lastIndexOf('/');
                var name = $dummyDiv
                  .text(_path.substring(index + 1))
                  .html // sanitizes, closes #9
                  ();
                item.id = NODE_PREFIX + _path;
                item.text = name;
                item.icon = type; // uses `type` as class name for tree node

                if (node) {
                  folders[''].push(item);
                } else {
                  folders[_path.substring(0, index)].push(item);
                }

                if (type === 'tree' || type === 'blob') {
                  if (type === 'tree') {
                    if (node) item.children = true;
                    else folders[item.path] = item.children = [];
                  }

                  // encodes but retains the slashes, see #274
                  var encodedPath = _path
                    .split('/')
                    .map(encodeURIComponent)
                    .join('/');
                  item.a_attr = {
                    href: _this._getItemHref(repo, type, _path)
                  };
                } else if (type === 'commit') {
                  var moduleUrl = submodules[item.path];
                  if (moduleUrl) {
                    // fixes #105
                    // special handling for submodules hosted in GitHub
                    if (~moduleUrl.indexOf('github.com')) {
                      moduleUrl = moduleUrl
                        .replace(/^git(:\/\/|@)/, window.location.protocol + '//')
                        .replace('github.com:', 'github.com/')
                        .replace(/.git$/, '');
                      item.text =
                        '<a href="' +
                        moduleUrl +
                        '" class="jstree-anchor">' +
                        name +
                        '</a>\n                               <span>@ </span>\n                               <a href="' +
                        moduleUrl +
                        '/tree/' +
                        item.sha +
                        '" class="jstree-anchor">' +
                        item.sha.substr(0, 7) +
                        '</a>';
                    }
                    item.a_attr = {href: moduleUrl};
                  }
                }
              }

              setTimeout(function() {
                return nextChunk(iteration + 1);
              });
            };

            nextChunk();
          });
        });
      }
    },
    {
      key: '_handleError',
      value: function _handleError(jqXHR, cb) {
        var error = void 0,
          message = void 0,
          needAuth = void 0;

        switch (jqXHR.status) {
          case 0:
            error = '连接错误';
            message =
              '\u65E0\u6CD5\u8FDE\u63A5\u5230\u7F51\u7AD9. \u5982\u679C\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5\u8FD9\u4E2A\u7F51\u7AD9\u5F88\u597D,\u4E5F\u8BB8\u6709\u4E00\u4E2A\u4E2D\u65AD\u7684API. \u8BF7\u7A0D\u540E\u518D\u8BD5.';
            needAuth = false;
            break;
          case 206:
            error = '仓库太大';
            message =
              '\u8FD9\u4E2A\u4ED3\u5E93\u68C0\u7D22\u592A\u5927. \u5982\u679C\u4F60\u7ECF\u5E38\u4F7F\u7528\u8FD9\u4E2A\u5E93,\u53BB\u8BBE\u7F6E\u548C\u53D6\u6D88\u201C\u7ACB\u5373\u52A0\u8F7D\u6574\u4E2A\u4ED3\u5E93\u201D\u7684\u9009\u9879.';
            break;
          case 401:
            error = '无效的token';
            message =
              'token\u662F\u65E0\u6548\u7684.\n            <a href="' +
              this.getCreateTokenUrl() +
              '" target="_blank">\u70B9\u6B64</a>\n           \u53BB\u521B\u5EFA\u4E00\u4E2Aaccess token\u5E76\u7C98\u8D34\u5230\u4E0B\u9762.';
            needAuth = true;
            break;
          case 409:
            error = '空仓库';
            message = '空仓库.';
            break;
          case 404:
            error = '私人仓库';
            message =
              '\u8BBF\u95EE\u79C1\u6709\u4ED3\u5E93\u9700\u8981access token.\n           <a href="' +
              this.getCreateTokenUrl() +
              '" target="_blank">\u70B9\u4E9B\u94FE\u63A5</a>\n           \u53BB\u521B\u5EFA\u4E00\u4E2Aaccess token\u5E76\u7C98\u8D34\u5230\u4E0B\u9762.';
            needAuth = true;
            break;
          case 403:
            if (~jqXHR.getAllResponseHeaders().indexOf('X-RateLimit-Remaining: 0')) {
              // It's kinda specific for GitHub
              error = 'API超过限制';
              message =
                '\u4F60\u5DF2\u7ECF\u8D85\u8FC7GitHub API\u5C0F\u65F6\u9650\u5236\u548C\u9700\u8981GitHub\u8BBF\u95EE\u4EE4\u724C\u8FDB\u884C\u989D\u5916\u7684\u8BF7\u6C42.\n                  <a href="' +
                this.getCreateTokenUrl() +
                '" target="_blank">\u70B9\u6B64</a>\n                   \u53BB\u521B\u5EFA\u4E00\u4E2Aaccess token\u5E76\u7C98\u8D34\u5230\u4E0B\u9762.';
              needAuth = true;
              break;
            } else {
              error = '禁止访问';
              message =
                '\u7981\u6B62\u8BBF\u95EE.\n               \u4F60\u53EF\u80FD\u9700\u8981\u63D0\u4F9B access token.\n             <a href="' +
                this.getCreateTokenUrl() +
                '" target="_blank">\u70B9\u4E9B\u94FE\u63A5</a>\n             \u53BB\u521B\u5EFA\u4E00\u4E2Aaccess token\u5E76\u7C98\u8D34\u5230\u4E0B\u9762.';
              needAuth = true;
              break;
            }
          default:
            error = message = jqXHR.statusText;
            needAuth = false;
            break;
        }
        cb({
          error: '\u9519\u8BEF\u4FE1\u606F: ' + error,
          message: message,
          needAuth: needAuth
        });
      }

      /**
       * Inits behaviors after the sidebar is added to the DOM.
       * @api public
       */
    },
    {
      key: 'init',
      value: function init($sidebar) {
        $sidebar
          .resizable({handles: 'e', minWidth: this.getMinWidth()})
          .addClass(this.getCssClass());
      }

      /**
       * Returns the CSS class to be added to the Octotree sidebar.
       * @api protected
       */
    },
    {
      key: 'getCssClass',
      value: function getCssClass() {
        throw new Error('没有实现的方法');
      }

      /**
       * Returns the minimum width acceptable for the sidebar.
       * @api protected
       */
    },
    {
      key: 'getMinWidth',
      value: function getMinWidth() {
        return 200;
      }

      /**
       * Returns whether the adapter is capable of loading the entire tree in
       * a single request. This is usually determined by the underlying the API.
       * @api public
       */
    },
    {
      key: 'canLoadEntireTree',
      value: function canLoadEntireTree() {
        return false;
      }

      /**
       * Loads the code tree.
       * @api public
       */
    },
    {
      key: 'loadCodeTree',
      value: function loadCodeTree(opts, cb) {
        throw new Error('没有实现的方法');
      }

      /**
       * Returns the URL to create a personal access token.
       * @api public
       */
    },
    {
      key: 'getCreateTokenUrl',
      value: function getCreateTokenUrl() {
        throw new Error('没有实现的方法');
      }

      /**
       * Updates the layout based on sidebar visibility and width.
       * @api public
       */
    },
    {
      key: 'updateLayout',
      value: function updateLayout(togglerVisible, sidebarVisible, sidebarWidth) {
        throw new Error('没有实现的方法');
      }

      /**
       * Returns repo info at the current path.
       * @api public
       */
    },
    {
      key: 'getRepoFromPath',
      value: function getRepoFromPath(showInNonCodePage, currentRepo, token, cb) {
        throw new Error('没有实现的方法');
      }

      /**
       * Selects the file at a specific path.
       * @api public
       */
    },
    {
      key: 'selectFile',
      value: function selectFile(path) {
        window.location.href = path;
      }

      /**
       * Selects a submodule.
       * @api public
       */
    },
    {
      key: 'selectSubmodule',
      value: function selectSubmodule(path) {
        window.location.href = path;
      }

      /**
       * Opens file or submodule in a new tab.
       * @api public
       */
    },
    {
      key: 'openInNewTab',
      value: function openInNewTab(path) {
        window.open(path, '_blank').focus();
      }

      /**
       * Downloads a file.
       * @api public
       */
    },
    {
      key: 'downloadFile',
      value: function downloadFile(path, fileName) {
        var link = document.createElement('a');
        link.setAttribute('href', path.replace(/\/blob\/|\/src\//, '/raw/'));
        link.setAttribute('download', fileName);
        link.click();
      }

      /**
       * Gets tree at path.
       * @param {Object} opts - {token, repo}
       * @api protected
       */
    },
    {
      key: '_getTree',
      value: function _getTree(path, opts, cb) {
        throw new Error('没有实现的方法');
      }

      /**
       * Gets submodules in the tree.
       * @param {Object} opts - {token, repo, encodedBranch}
       * @api protected
       */
    },
    {
      key: '_getSubmodules',
      value: function _getSubmodules(tree, opts, cb) {
        throw new Error('没有实现的方法');
      }

      /**
       * Returns item's href value.
       * @api protected
       */
    },
    {
      key: '_getItemHref',
      value: function _getItemHref(repo, type, encodedPath) {
        return (
          '/' +
          repo.username +
          '/' +
          repo.reponame +
          '/' +
          type +
          '/' +
          repo.branch +
          '/' +
          encodedPath
        );
      }
    }
  ]);

  return Adapter;
})();

var PjaxAdapter = (function(_Adapter) {
  _inherits(PjaxAdapter, _Adapter);

  function PjaxAdapter() {
    _classCallCheck(this, PjaxAdapter);

    var _this2 = _possibleConstructorReturn(
      this,
      (PjaxAdapter.__proto__ || Object.getPrototypeOf(PjaxAdapter)).call(this, ['jquery.pjax.js'])
    );

    $.pjax.defaults.timeout = 0; // no timeout
    $(document)
      .on('pjax:send', function() {
        return $(document).trigger(EVENT.REQ_START);
      })
      .on('pjax:end', function() {
        return $(document).trigger(EVENT.REQ_END);
      });
    return _this2;
  }

  // @override
  // @param {Object} opts - {pjaxContainer: the specified pjax container}
  // @api public

  _createClass(PjaxAdapter, [
    {
      key: 'init',
      value: function init($sidebar, opts) {
        _get(
          PjaxAdapter.prototype.__proto__ || Object.getPrototypeOf(PjaxAdapter.prototype),
          'init',
          this
        ).call(this, $sidebar);

        opts = opts || {};
        var pjaxContainer = opts.pjaxContainer;

        if (!window.MutationObserver) return;

        // Some host switch pages using pjax. This observer detects if the pjax container
        // has been updated with new contents and trigger layout.
        var pageChangeObserver = new window.MutationObserver(function() {
          // Trigger location change, can't just relayout as Octotree might need to
          // hide/show depending on whether the current page is a code page or not.
          return $(document).trigger(EVENT.LOC_CHANGE);
        });

        if (pjaxContainer) {
          pageChangeObserver.observe(pjaxContainer, {
            childList: true
          });
        } else {
          var _detectLocChange = function _detectLocChange() {
            if (location.href !== href || location.hash !== hash) {
              href = location.href;
              hash = location.hash;

              // If this is the first time this is called, no need to notify change as
              // Octotree does its own initialization after loading options.
              if (firstLoad) {
                firstLoad = false;
              } else {
                setTimeout(
                  function() {
                    $(document).trigger(EVENT.LOC_CHANGE);
                  },
                  300 // Wait a bit for pjax DOM change
                );
              }
            }
            setTimeout(_detectLocChange, 200);
          };

          // Fall back if DOM has been changed
          var firstLoad = true,
            href = void 0,
            hash = void 0;

          _detectLocChange();
        }
      }

      // @override
      // @param {Object} opts - {$pjax_container: jQuery object}
      // @api public
    },
    {
      key: 'selectFile',
      value: function selectFile(path, opts) {
        opts = opts || {};
        var $pjaxContainer = opts.$pjaxContainer;
        var fragment = opts.fragment;

        if ($pjaxContainer.length) {
          $.pjax({
            // needs full path for pjax to work with Firefox as per cross-domain-content setting
            url: location.protocol + '//' + location.host + path,
            container: $pjaxContainer,
            fragment: fragment
          });
        } else {
          // falls back
          _get(
            PjaxAdapter.prototype.__proto__ || Object.getPrototypeOf(PjaxAdapter.prototype),
            'selectFile',
            this
          ).call(this, path);
        }
      }
    }
  ]);

  return PjaxAdapter;
})(Adapter);
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true}
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var BB_RESERVED_USER_NAMES = [
  'account',
  'dashboard',
  'integrations',
  'product',
  'repo',
  'snippets',
  'support',
  'whats-new'
];
var BB_RESERVED_REPO_NAMES = [];
var BB_RESERVED_TYPES = ['raw'];
var BB_404_SEL = '#error.404';
var BB_PJAX_CONTAINER_SEL = '#source-container';

var Bitbucket = (function(_PjaxAdapter) {
  _inherits(Bitbucket, _PjaxAdapter);

  function Bitbucket() {
    _classCallCheck(this, Bitbucket);

    return _possibleConstructorReturn(
      this,
      (Bitbucket.__proto__ || Object.getPrototypeOf(Bitbucket)).call(this, ['jquery.pjax.js'])
    );
  }

  // @override

  _createClass(Bitbucket, [
    {
      key: 'init',
      value: function init($sidebar) {
        var pjaxContainer = $(BB_PJAX_CONTAINER_SEL)[0];
        _get(
          Bitbucket.prototype.__proto__ || Object.getPrototypeOf(Bitbucket.prototype),
          'init',
          this
        ).call(this, $sidebar, {pjaxContainer: pjaxContainer});
      }

      // @override
    },
    {
      key: 'getCssClass',
      value: function getCssClass() {
        return 'octotree_bitbucket_sidebar';
      }

      // @override
    },
    {
      key: 'getCreateTokenUrl',
      value: function getCreateTokenUrl() {
        return location.protocol + '//' + location.host + '/account/admin/app-passwords/new';
      }

      // @override
    },
    {
      key: 'updateLayout',
      value: function updateLayout(togglerVisible, sidebarVisible, sidebarWidth) {
        $('.octotree_toggle').css('right', sidebarVisible ? '' : -44);
        $('.aui-header').css('padding-left', sidebarVisible ? '' : 56);
        $('html').css('margin-left', sidebarVisible ? sidebarWidth : '');
      }

      // @override
    },
    {
      key: 'getRepoFromPath',
      value: function getRepoFromPath(showInNonCodePage, currentRepo, token, cb) {
        var _this2 = this;

        // 404 page, skip
        if ($(BB_404_SEL).length) {
          return cb();
        }

        // (username)/(reponame)[/(type)]
        var match = window.location.pathname.match(/([^\/]+)\/([^\/]+)(?:\/([^\/]+))?/);
        if (!match) {
          return cb();
        }

        var username = match[1];
        var reponame = match[2];
        var type = match[3];

        // Not a repository, skip
        if (
          ~BB_RESERVED_USER_NAMES.indexOf(username) ||
          ~BB_RESERVED_REPO_NAMES.indexOf(reponame) ||
          ~BB_RESERVED_TYPES.indexOf(type)
        ) {
          return cb();
        }

        // Skip non-code page unless showInNonCodePage is true
        // with Bitbucket /username/repo is non-code page
        if (!showInNonCodePage && (!type || (type && type !== 'src'))) {
          return cb();
        }

        // Get branch by inspecting page, quite fragile so provide multiple fallbacks
        var BB_BRANCH_SEL_1 = '.branch-dialog-trigger';

        var branch =
          // Code page
          $(BB_BRANCH_SEL_1).attr('title') ||
          // Assume same with previously
          (currentRepo.username === username &&
            currentRepo.reponame === reponame &&
            currentRepo.branch) ||
          // Default from cache
          this._defaultBranch[username + '/' + reponame];

        var repo = {username: username, reponame: reponame, branch: branch};

        if (repo.branch) {
          cb(null, repo);
        } else {
          this._get('/main-branch', {repo: repo, token: token}, function(err, data) {
            if (err) return cb(err);
            repo.branch = _this2._defaultBranch[username + '/' + reponame] = data.name || 'master';
            cb(null, repo);
          });
        }
      }

      // @override
    },
    {
      key: 'selectFile',
      value: function selectFile(path) {
        var $pjaxContainer = $(BB_PJAX_CONTAINER_SEL);
        _get(
          Bitbucket.prototype.__proto__ || Object.getPrototypeOf(Bitbucket.prototype),
          'selectFile',
          this
        ).call(this, path, {$pjaxContainer: $pjaxContainer});
      }

      // @override
    },
    {
      key: 'loadCodeTree',
      value: function loadCodeTree(opts, cb) {
        opts.path = opts.node.path;
        this._loadCodeTree(
          opts,
          function(item) {
            if (!item.type) {
              item.type = 'blob';
            }
          },
          cb
        );
      }

      // @override
    },
    {
      key: '_getTree',
      value: function _getTree(path, opts, cb) {
        this._get('/src/' + opts.repo.branch + '/' + path, opts, function(err, res) {
          if (err) return cb(err);
          var directories = res.directories.map(function(dir) {
            return {path: dir, type: 'tree'};
          });
          res.files.forEach(function(file) {
            if (file.path.startsWith(res.path)) {
              file.path = file.path.substring(res.path.length);
            }
          });
          var tree = res.files.concat(directories);
          cb(null, tree);
        });
      }

      // @override
    },
    {
      key: '_getSubmodules',
      value: function _getSubmodules(tree, opts, cb) {
        var _this3 = this;

        if (opts.repo.submodules) {
          return this._getSubmodulesInCurrentPath(tree, opts, cb);
        }

        var item = tree.filter(function(item) {
          return /^\.gitmodules$/i.test(item.path);
        })[0];
        if (!item) return cb();

        this._get('/src/' + opts.encodedBranch + '/' + item.path, opts, function(err, res) {
          if (err)
            return cb(
              err
              // Memoize submodules so that they will be inserted into the tree later.
            );
          opts.repo.submodules = parseGitmodules(res.data);
          _this3._getSubmodulesInCurrentPath(tree, opts, cb);
        });
      }

      // @override
    },
    {
      key: '_getSubmodulesInCurrentPath',
      value: function _getSubmodulesInCurrentPath(tree, opts, cb) {
        var currentPath = opts.path;
        var isInCurrentPath = currentPath
          ? function(path) {
              return path.startsWith(currentPath + '/');
            }
          : function(path) {
              return path.indexOf('/') === -1;
            };

        var submodules = opts.repo.submodules;
        var submodulesInCurrentPath = {};
        Object.keys(submodules)
          .filter(isInCurrentPath)
          .forEach(
            function(key) {
              submodulesInCurrentPath[key] = submodules[key];
            }

            // Insert submodules in current path into the tree because submodules can not
            // be retrieved with Bitbucket API but can only by reading .gitmodules.
          );
        Object.keys(submodulesInCurrentPath).forEach(function(path) {
          if (currentPath) {
            // `currentPath` is prefixed to `path`, so delete it.
            path = path.substring(currentPath.length + 1);
          }
          tree.push({path: path, type: 'commit'});
        });
        cb(null, submodulesInCurrentPath);
      }

      // @override
    },
    {
      key: '_get',
      value: function _get(path, opts, cb) {
        var _this4 = this;

        var host = location.protocol + '//' + 'api.bitbucket.org/1.0';
        var url =
          host + '/repositories/' + opts.repo.username + '/' + opts.repo.reponame + (path || '');
        var cfg = {url: url, method: 'GET', cache: false};

        if (opts.token) {
          // Bitbucket App passwords can be used only for Basic Authentication.
          // Get username of logged-in user.
          var username = null,
            token = null;

          // Or get username by spliting token.
          if (opts.token.includes(':')) {
            var result = opts.token.split(':');
            (username = result[0]), (token = result[1]);
          } else {
            var currentUser = JSON.parse($('body').attr('data-current-user'));
            if (!currentUser || !currentUser.username) {
              return cb({
                error: 'Error: Invalid token',
                message:
                  'Cannot retrieve your user name from the current page.\n                      Please update the token setting to prepend your user\n                      name to the token, separated by a colon, i.e. USERNAME:TOKEN',
                needAuth: true
              });
            }
            (username = currentUser.username), (token = opts.token);
          }
          cfg.headers = {Authorization: 'Basic ' + btoa(username + ':' + token)};
        }

        $.ajax(cfg)
          .done(function(data) {
            return cb(null, data);
          })
          .fail(function(jqXHR) {
            _this4._handleError(jqXHR, cb);
          });
      }

      // @override
    },
    {
      key: '_getItemHref',
      value: function _getItemHref(repo, type, encodedPath) {
        return (
          '/' + repo.username + '/' + repo.reponame + '/src/' + repo.branch + '/' + encodedPath
        );
      }
    }
  ]);

  return Bitbucket;
})(PjaxAdapter);
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true}
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var GH_RESERVED_USER_NAMES = [
  'settings',
  'orgs',
  'organizations',
  'site',
  'blog',
  'about',
  'explore',
  'styleguide',
  'showcases',
  'trending',
  'stars',
  'dashboard',
  'notifications',
  'search',
  'developer',
  'account',
  'pulls',
  'issues',
  'features',
  'contact',
  'security',
  'join',
  'login',
  'watching',
  'new',
  'integrations',
  'gist',
  'business',
  'mirrors',
  'open-source',
  'personal',
  'pricing'
];
var GH_RESERVED_REPO_NAMES = ['followers', 'following', 'repositories'];
var GH_404_SEL = '#parallax_wrapper';
var GH_PJAX_CONTAINER_SEL =
  '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]';
var GH_CONTAINERS = '.container, .container-responsive';
var GH_RAW_CONTENT = 'body > pre';

var GitHub = (function(_PjaxAdapter) {
  _inherits(GitHub, _PjaxAdapter);

  function GitHub() {
    _classCallCheck(this, GitHub);

    return _possibleConstructorReturn(
      this,
      (GitHub.__proto__ || Object.getPrototypeOf(GitHub)).call(this, ['jquery.pjax.js'])
    );
  }

  // @override

  _createClass(GitHub, [
    {
      key: 'init',
      value: function init($sidebar) {
        var pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0];
        _get(
          GitHub.prototype.__proto__ || Object.getPrototypeOf(GitHub.prototype),
          'init',
          this
        ).call(
          this,
          $sidebar,
          {pjaxContainer: pjaxContainer}

          // Fix #151 by detecting when page layout is updated.
          // In this case, split-diff page has a wider layout, so need to recompute margin.
          // Note that couldn't do this in response to URL change, since new DOM via pjax might not be ready.
        );
        var diffModeObserver = new window.MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (
              ~mutation.oldValue.indexOf('split-diff') ||
              ~mutation.target.className.indexOf('split-diff')
            ) {
              return $(document).trigger(EVENT.LAYOUT_CHANGE);
            }
          });
        });

        diffModeObserver.observe(document.body, {
          attributes: true,
          attributeFilter: ['class'],
          attributeOldValue: true
        });
      }

      // @override
    },
    {
      key: 'getCssClass',
      value: function getCssClass() {
        return 'octotree_github_sidebar';
      }

      // @override
    },
    {
      key: 'canLoadEntireTree',
      value: function canLoadEntireTree() {
        return true;
      }

      // @override
    },
    {
      key: 'getCreateTokenUrl',
      value: function getCreateTokenUrl() {
        return location.protocol + '//' + location.host + '/settings/tokens/new';
      }

      // @override
    },
    {
      key: 'updateLayout',
      value: function updateLayout(togglerVisible, sidebarVisible, sidebarWidth) {
        var SPACING = 10;
        var $containers = $(GH_CONTAINERS);
        var autoMarginLeft = ($(document).width() - $containers.width()) / 2;
        var shouldPushLeft = sidebarVisible && autoMarginLeft <= sidebarWidth + SPACING;

        $('html').css('margin-left', shouldPushLeft ? sidebarWidth : '');
        $containers.css('margin-left', shouldPushLeft ? SPACING : '');
      }

      // @override
    },
    {
      key: 'getRepoFromPath',
      value: function getRepoFromPath(showInNonCodePage, currentRepo, token, cb) {
        var _this2 = this;

        // 404 page, skip
        if ($(GH_404_SEL).length) {
          return cb();
        }

        // Skip raw page
        if ($(GH_RAW_CONTENT).length) {
          return cb();
        }

        // (username)/(reponame)[/(type)]
        var match = window.location.pathname.match(/([^\/]+)\/([^\/]+)(?:\/([^\/]+))?/);
        if (!match) {
          return cb();
        }

        var username = match[1];
        var reponame = match[2];

        // Not a repository, skip
        if (
          ~GH_RESERVED_USER_NAMES.indexOf(username) ||
          ~GH_RESERVED_REPO_NAMES.indexOf(reponame)
        ) {
          return cb();
        }

        // Skip non-code page unless showInNonCodePage is true
        if (!showInNonCodePage && match[3] && !~['tree', 'blob'].indexOf(match[3])) {
          return cb();
        }

        // Get branch by inspecting page, quite fragile so provide multiple fallbacks
        var branch =
          // Code page
          $('.branch-select-menu .select-menu-item.selected').data('name') ||
          // Pull requests page
          ($('.commit-ref.base-ref').attr('title') || ':').match(/:(.*)/)[1] ||
          // Reuse last selected branch if exist
          (currentRepo.username === username &&
            currentRepo.reponame === reponame &&
            currentRepo.branch) ||
          // Get default branch from cache
          this._defaultBranch[username + '/' + reponame];

        // Still no luck, get default branch for real
        var repo = {username: username, reponame: reponame, branch: branch};

        if (repo.branch) {
          cb(null, repo);
        } else {
          this._get(null, {repo: repo, token: token}, function(err, data) {
            if (err) return cb(err);
            repo.branch = _this2._defaultBranch[username + '/' + reponame] =
              data.default_branch || 'master';
            cb(null, repo);
          });
        }
      }

      // @override
    },
    {
      key: 'selectFile',
      value: function selectFile(path) {
        var $pjaxContainer = $(GH_PJAX_CONTAINER_SEL);
        _get(
          GitHub.prototype.__proto__ || Object.getPrototypeOf(GitHub.prototype),
          'selectFile',
          this
        ).call(this, path, {$pjaxContainer: $pjaxContainer});
      }

      // @override
    },
    {
      key: 'loadCodeTree',
      value: function loadCodeTree(opts, cb) {
        opts.encodedBranch = encodeURIComponent(decodeURIComponent(opts.repo.branch));
        opts.path =
          (opts.node && (opts.node.sha || opts.encodedBranch)) ||
          opts.encodedBranch + '?recursive=1';
        this._loadCodeTree(opts, null, cb);
      }

      // @override
    },
    {
      key: '_getTree',
      value: function _getTree(path, opts, cb) {
        this._get('/git/trees/' + path, opts, function(err, res) {
          if (err) cb(err);
          else cb(null, res.tree);
        });
      }

      // @override
    },
    {
      key: '_getSubmodules',
      value: function _getSubmodules(tree, opts, cb) {
        var item = tree.filter(function(item) {
          return /^\.gitmodules$/i.test(item.path);
        })[0];
        if (!item) return cb();

        this._get('/git/blobs/' + item.sha, opts, function(err, res) {
          if (err) return cb(err);
          var data = atob(res.content.replace(/\n/g, ''));
          cb(null, parseGitmodules(data));
        });
      }
    },
    {
      key: '_get',
      value: function _get(path, opts, cb) {
        var _this3 = this;

        var host =
          location.protocol +
          '//' +
          (location.host === 'github.com' ? 'api.github.com' : location.host + '/api/v3');
        var url = host + '/repos/' + opts.repo.username + '/' + opts.repo.reponame + (path || '');
        var cfg = {url: url, method: 'GET', cache: false};

        if (opts.token) {
          cfg.headers = {Authorization: 'token ' + opts.token};
        }

        $.ajax(cfg)
          .done(function(data) {
            if (path && path.indexOf('/git/trees') === 0 && data.truncated) {
              _this3._handleError({status: 206}, cb);
            } else cb(null, data);
          })
          .fail(function(jqXHR) {
            return _this3._handleError(jqXHR, cb);
          });
      }
    }
  ]);

  return GitHub;
})(PjaxAdapter);
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true}
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var OSC_RESERVED_USER_NAMES = [
  'settings',
  'orgs',
  'organizations',
  'site',
  'blog',
  'about',
  'explore',
  'styleguide',
  'showcases',
  'trending',
  'stars',
  'dashboard',
  'notifications',
  'search',
  'developer',
  'account',
  'pulls',
  'issues',
  'features',
  'contact',
  'security',
  'join',
  'login',
  'watching',
  'new',
  'integrations',
  'gist',
  'business',
  'mirrors',
  'open-source',
  'personal',
  'pricing'
];
var OSC_RESERVED_REPO_NAMES = ['followers', 'following', 'repositories'];
var OSC_404_SEL = '#parallax_wrapper';
var OSC_PJAX_CONTAINER_SEL = '#tree-holder';
var OSC_CONTAINERS = '#git-header-nav';
var OSC_RAW_CONTENT = 'body > pre';

var Oschina = (function(_PjaxAdapter) {
  _inherits(Oschina, _PjaxAdapter);

  function Oschina() {
    _classCallCheck(this, Oschina);

    return _possibleConstructorReturn(
      this,
      (Oschina.__proto__ || Object.getPrototypeOf(Oschina)).call(this, ['jquery.pjax.js'])
    );
  }

  // @override

  _createClass(Oschina, [
    {
      key: 'init',
      value: function init($sidebar) {
        var pjaxContainer = $(OSC_PJAX_CONTAINER_SEL)[0];
        _get(
          Oschina.prototype.__proto__ || Object.getPrototypeOf(Oschina.prototype),
          'init',
          this
        ).call(
          this,
          $sidebar,
          {pjaxContainer: pjaxContainer}

          // Fix #151 by detecting when page layout is updated.
          // In this case, split-diff page has a wider layout, so need to recompute margin.
          // Note that couldn't do this in response to URL change, since new DOM via pjax might not be ready.
        );
        var diffModeObserver = new window.MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (
              ~mutation.oldValue.indexOf('split-diff') ||
              ~mutation.target.className.indexOf('split-diff')
            ) {
              return $(document).trigger(EVENT.LAYOUT_CHANGE);
            }
          });
        });

        diffModeObserver.observe(document.body, {
          attributes: true,
          attributeFilter: ['class'],
          attributeOldValue: true
        });
      }

      // @override
    },
    {
      key: 'getCssClass',
      value: function getCssClass() {
        return 'octotree_oschina_sidebar';
      }

      // @override
    },
    {
      key: 'canLoadEntireTree',
      value: function canLoadEntireTree() {
        return true;
      }

      // @override
    },
    {
      key: 'getCreateTokenUrl',
      value: function getCreateTokenUrl() {
        return 'http://git.oschina.net/api/v5/swagger';
      }

      // @override
    },
    {
      key: 'updateLayout',
      value: function updateLayout(togglerVisible, sidebarVisible, sidebarWidth) {
        var SPACING = 232;
        var $containers = $(OSC_CONTAINERS);
        var autoMarginLeft = ($(document).width() - $containers.width()) / 2;
        var WIDTH = $(document).width() - SPACING;
        var shouldPushLeft = sidebarVisible && autoMarginLeft <= sidebarWidth + SPACING;

        $('html').css('margin-left', shouldPushLeft ? sidebarWidth : '');
        $containers.css('margin-left', shouldPushLeft ? SPACING : '');
        $containers.css(
          'width',
          shouldPushLeft ? WIDTH : ''
          // $(".ui.right.floated.horizontal.list").css('margin-right', shouldPushLeft ? 210 : '')
        );
        $('.git-project-download-panel').css('margin-right', shouldPushLeft ? 240 : '');
      }

      // @override
    },
    {
      key: 'getRepoFromPath',
      value: function getRepoFromPath(showInNonCodePage, currentRepo, token, cb) {
        var _this2 = this;

        // 404 page, skip
        if ($(OSC_404_SEL).length) {
          return cb();
        }

        // Skip raw page
        if ($(OSC_RAW_CONTENT).length) {
          return cb();
        }

        // (username)/(reponame)[/(type)]
        var match = window.location.pathname.match(/([^\/]+)\/([^\/]+)(?:\/([^\/]+))?/);
        if (!match) {
          return cb();
        }

        var username = match[1];
        var reponame = match[2];

        // Not a repository, skip
        if (
          ~OSC_RESERVED_USER_NAMES.indexOf(username) ||
          ~OSC_RESERVED_REPO_NAMES.indexOf(reponame)
        ) {
          return cb();
        }

        // Skip non-code page unless showInNonCodePage is true
        if (!showInNonCodePage && match[3] && !~['tree', 'blob'].indexOf(match[3])) {
          return cb();
        }

        // Get branch by inspecting page, quite fragile so provide multiple fallbacks
        var branch =
          // Code page
          $('#git-project-branch .text')
            .text()
            .trim() ||
          // Pull requests page
          ($('.commit-ref.base-ref').attr('title') || ':').match(/:(.*)/)[1] ||
          // Reuse last selected branch if exist
          (currentRepo.username === username &&
            currentRepo.reponame === reponame &&
            currentRepo.branch) ||
          // Get default branch from cache
          this._defaultBranch[username + '/' + reponame];

        // Still no luck, get default branch for real
        var repo = {username: username, reponame: reponame, branch: branch};

        if (repo.branch) {
          cb(null, repo);
        } else {
          this._get(null, {repo: repo, token: token}, function(err, data) {
            if (err) return cb(err);
            repo.branch = _this2._defaultBranch[username + '/' + reponame] =
              data.default_branch || 'master';
            cb(null, repo);
          });
        }
      }

      // @override
    },
    {
      key: 'selectFile',
      value: function selectFile(path) {
        var $pjaxContainer = $(OSC_PJAX_CONTAINER_SEL);
        _get(
          Oschina.prototype.__proto__ || Object.getPrototypeOf(Oschina.prototype),
          'selectFile',
          this
        ).call(this, path, {$pjaxContainer: $pjaxContainer, fragment: OSC_PJAX_CONTAINER_SEL});
      }

      // @override
    },
    {
      key: 'loadCodeTree',
      value: function loadCodeTree(opts, cb) {
        opts.encodedBranch = encodeURIComponent(decodeURIComponent(opts.repo.branch));
        opts.path =
          (opts.node && (opts.node.sha || opts.encodedBranch)) ||
          opts.encodedBranch + '?recursive=1';
        this._loadCodeTree(opts, null, cb);
      }

      // @override
    },
    {
      key: '_getTree',
      value: function _getTree(path, opts, cb) {
        this._get('/git/trees/' + path, opts, function(err, res) {
          if (err) cb(err);
          else cb(null, res.tree);
        });
      }

      // @override
    },
    {
      key: '_getSubmodules',
      value: function _getSubmodules(tree, opts, cb) {
        var item = tree.filter(function(item) {
          return /^\.gitmodules$/i.test(item.path);
        })[0];
        if (!item) return cb();

        this._get('/git/blobs/' + item.sha, opts, function(err, res) {
          if (err) return cb(err);
          var data = atob(res.content.replace(/\n/g, ''));
          cb(null, parseGitmodules(data));
        });
      }
    },
    {
      key: '_get',
      value: function _get(path, opts, cb) {
        var _this3 = this;

        var host = location.href.startsWith('https')
          ? 'https://git.oschina.net/api/v5'
          : 'http://git.oschina.net/api/v5';
        var url = host + '/repos/' + opts.repo.username + '/' + opts.repo.reponame + (path || '');
        var request = function request(retry) {
          if (!retry && opts.token) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + ('access_token=' + opts.token);
          }
          var cfg = {
            url: url,
            method: 'GET',
            cache: false,
            xhrFields: {
              withCredentials: true
            }
          };

          $.ajax(cfg)
            .done(function(data) {
              if (path && path.indexOf('/git/trees') === 0 && data.truncated) {
                _this3._handleError({status: 206}, cb);
              } else cb(null, data);
            })
            .fail(function(jqXHR) {
              if (retry) {
                request(false);
              } else {
                _this3._handleError(jqXHR, cb);
              }
            });
        };
        request(true);
      }
    }
  ]);

  return Oschina;
})(PjaxAdapter);
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var HelpPopup = (function() {
  function HelpPopup($dom, store) {
    _classCallCheck(this, HelpPopup);

    this.$view = $dom.find('.popup');
    this.store = store;
  }

  _createClass(HelpPopup, [
    {
      key: 'init',
      value: function init() {
        var $view = this.$view;
        var store = this.store;
        var popupShown = store.get(STORE.POPUP);
        var sidebarVisible = $('html').hasClass(SHOW_CLASS);

        if (popupShown || sidebarVisible) {
          return hideAndDestroy();
        }

        $(document).one(EVENT.TOGGLE, hideAndDestroy);

        setTimeout(function() {
          setTimeout(hideAndDestroy, 6000);
          $view.addClass('show').click(hideAndDestroy);
        }, 500);

        function hideAndDestroy() {
          store.set(STORE.POPUP, true);
          if ($view.hasClass('show')) {
            $view.removeClass('show').one('transitionend', function() {
              return $view.remove();
            });
          } else {
            $view.remove();
          }
        }
      }
    }
  ]);

  return HelpPopup;
})();
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var ErrorView = (function() {
  function ErrorView($dom, store) {
    _classCallCheck(this, ErrorView);

    this.store = store;
    this.$view = $dom.find('.octotree_errorview').submit(this._saveToken.bind(this));
  }

  _createClass(ErrorView, [
    {
      key: 'show',
      value: function show(err) {
        var $token = this.$view.find('input[name="token"]');
        var $submit = this.$view.find('button[type="submit"]');
        var $help = $submit.next();
        var token = this.store.get(STORE.TOKEN);

        this.$view.find('.octotree_view_header').html(err.error);
        this.$view.find('.message').html(err.message);

        if (err.needAuth) {
          $submit.show();
          $token.show();
          $help.show();
          if (token) $token.val(token);
        } else {
          $submit.hide();
          $token.hide();
          $help.hide();
        }

        $(this).trigger(EVENT.VIEW_READY);
      }
    },
    {
      key: '_saveToken',
      value: function _saveToken(event) {
        var _this = this;

        event.preventDefault();

        var $error = this.$view.find('.error').text('');
        var $token = this.$view.find('[name="token"]');
        var oldToken = this.store.get(STORE.TOKEN);
        var newToken = $token.val();

        if (!newToken) return $error.text('Token is required');

        this.store.set(STORE.TOKEN, newToken, function() {
          var changes = _defineProperty({}, STORE.TOKEN, [oldToken, newToken]);
          $(_this).trigger(EVENT.OPTS_CHANGE, changes);
          $token.val('');
        });
      }
    }
  ]);

  return ErrorView;
})();
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var TreeView = (function() {
  function TreeView($dom, store, adapter) {
    var _this = this;

    _classCallCheck(this, TreeView);

    this.store = store;
    this.adapter = adapter;
    this.$view = $dom.find('.octotree_treeview');
    this.$tree = this.$view
      .find('.octotree_view_body')
      .on('click.jstree', '.jstree-open>a', function(_ref) {
        var target = _ref.target;
        return _this.$jstree.close_node(target);
      })
      .on('click.jstree', '.jstree-closed>a', function(_ref2) {
        var target = _ref2.target;
        return _this.$jstree.open_node(target);
      })
      .on('click', this._onItemClick.bind(this))
      .jstree({
        core: {multiple: false, worker: false, themes: {responsive: false}},
        plugins: ['wholerow']
      });
  }

  _createClass(TreeView, [
    {
      key: 'show',
      value: function show(repo, token) {
        var _this2 = this;

        var $jstree = this.$jstree;

        $jstree.settings.core.data = function(node, cb) {
          var loadAll = _this2.adapter.canLoadEntireTree() && _this2.store.get(STORE.LOADALL);
          node = !loadAll && (node.id === '#' ? {path: ''} : node.original);

          _this2.adapter.loadCodeTree({repo: repo, token: token, node: node}, function(
            err,
            treeData
          ) {
            if (err) {
              $(_this2).trigger(EVENT.FETCH_ERROR, [err]);
            } else {
              treeData = _this2._sort(treeData);
              if (loadAll) {
                treeData = _this2._collapse(treeData);
              }
              cb(treeData);
            }
          });
        };

        this.$tree.one('refresh.jstree', function() {
          _this2.syncSelection();
          $(_this2).trigger(EVENT.VIEW_READY);
        });

        this._showHeader(repo);
        $jstree.refresh(true);
      }
    },
    {
      key: '_showHeader',
      value: function _showHeader(repo) {
        var adapter = this.adapter;

        this.$view
          .find('.octotree_view_header')
          .html(
            '<div class="octotree_header_repo">' +
              '<a href="/' +
              repo.username +
              '">' +
              repo.username +
              '</a>' +
              ' / ' +
              '<a data-pjax href="/' +
              repo.username +
              '/' +
              repo.reponame +
              '">' +
              repo.reponame +
              '</a>' +
              '</div>' +
              '<div class="octotree_header_branch">' +
              this._deXss(repo.branch.toString()) +
              '</div>'
          )
          .on('click', 'a[data-pjax]', function(event) {
            event.preventDefault();
            var href = $(this).attr(
              'href'
            ); /* a.href always return absolute URL, don't want that */
            var newTab = event.shiftKey || event.ctrlKey || event.metaKey;
            newTab ? adapter.openInNewTab(href) : adapter.selectFile(href);
          });
      }
    },
    {
      key: '_deXss',
      value: function _deXss(str) {
        return str && str.replace(/[<>'"&]/g, '-');
      }
    },
    {
      key: '_sort',
      value: function _sort(folder) {
        var _this3 = this;

        folder.sort(function(a, b) {
          if (a.type === b.type) return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
          return a.type === 'blob' ? 1 : -1;
        });

        folder.forEach(function(item) {
          if (item.type === 'tree' && item.children !== true && item.children.length > 0) {
            _this3._sort(item.children);
          }
        });

        return folder;
      }
    },
    {
      key: '_collapse',
      value: function _collapse(folder) {
        var _this4 = this;

        return folder.map(function(item) {
          if (item.type === 'tree') {
            item.children = _this4._collapse(item.children);
            if (item.children.length === 1 && item.children[0].type === 'tree') {
              var onlyChild = item.children[0];
              onlyChild.text = item.text + '/' + onlyChild.text;
              return onlyChild;
            }
          }
          return item;
        });
      }
    },
    {
      key: '_onItemClick',
      value: function _onItemClick(event) {
        var _this5 = this;

        var $target = $(event.target);
        var download = false;

        // handle middle click
        if (event.which === 2) return;

        // handle icon click, fix #122
        if ($target.is('i.jstree-icon')) {
          $target = $target.parent();
          download = true;
        }

        if (!$target.is('a.jstree-anchor')) return;

        // refocus after complete so that keyboard navigation works, fix #158
        var refocusAfterCompletion = function refocusAfterCompletion() {
          $(document).one('pjax:success page:load', function() {
            _this5.$jstree.get_container().focus();
          });
        };

        var adapter = this.adapter;
        var newTab = event.shiftKey || event.ctrlKey || event.metaKey;
        var href = $target.attr('href');
        var $icon = $target.children().length
          ? $target.children(':first')
          : $target.siblings(
              ':first' // handles child links in submodule
            );
        if ($icon.hasClass('commit')) {
          refocusAfterCompletion();
          newTab ? adapter.openInNewTab(href) : adapter.selectSubmodule(href);
        } else if ($icon.hasClass('blob')) {
          if (download) {
            adapter.downloadFile(href, $target.text());
          } else {
            refocusAfterCompletion();
            newTab ? adapter.openInNewTab(href) : adapter.selectFile(href);
          }
        }
      }
    },
    {
      key: 'syncSelection',
      value: function syncSelection() {
        var $jstree = this.$jstree;
        if (!$jstree) return;

        // converts /username/reponame/object_type/branch/path to path
        var path = decodeURIComponent(location.pathname);
        var match = path.match(/(?:[^\/]+\/){4}(.*)/);
        if (!match) return;

        var currentPath = match[1];
        var loadAll = this.adapter.canLoadEntireTree() && this.store.get(STORE.LOADALL);

        selectPath(
          loadAll ? [currentPath] : breakPath(currentPath)

          // converts ['a/b'] to ['a', 'a/b']
        );
        function breakPath(fullPath) {
          return fullPath.split('/').reduce(function(res, path, idx) {
            res.push(idx === 0 ? path : res[idx - 1] + '/' + path);
            return res;
          }, []);
        }

        function selectPath(paths) {
          var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          var nodeId = NODE_PREFIX + paths[index];

          if ($jstree.get_node(nodeId)) {
            $jstree.deselect_all();
            $jstree.select_node(nodeId);
            $jstree.open_node(nodeId, function() {
              if (++index < paths.length) {
                selectPath(paths, index);
              }
            });
          }
        }
      }
    },
    {
      key: '$jstree',
      get: function get() {
        return this.$tree.jstree(true);
      }
    }
  ]);

  return TreeView;
})();
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var OptionsView = (function() {
  function OptionsView($dom, store) {
    var _this = this;

    _classCallCheck(this, OptionsView);

    this.store = store;
    this.$view = $dom.find('.octotree_optsview').submit(this._save.bind(this));
    this.$toggler = $dom.find('.octotree_opts').click(this._toggle.bind(this));
    this.elements = this.$view
      .find('[data-store]')
      .toArray

      // hide options view when sidebar is hidden
      ();
    $(document).on(EVENT.TOGGLE, function(event, visible) {
      if (!visible) _this._toggle(false);
    });
  }

  _createClass(OptionsView, [
    {
      key: '_toggle',
      value: function _toggle(visibility) {
        if (visibility !== undefined) {
          if (this.$view.hasClass('current') === visibility) return;
          return this._toggle();
        }

        if (this.$toggler.hasClass('selected')) {
          this.$toggler.removeClass('selected');
          $(this).trigger(EVENT.VIEW_CLOSE);
        } else {
          this._load();
        }
      }
    },
    {
      key: '_load',
      value: function _load() {
        var _this2 = this;

        this._eachOption(
          function($elm, key, value, cb) {
            if ($elm.is(':checkbox')) $elm.prop('checked', value);
            else $elm.val(value);
            cb();
          },
          function() {
            _this2.$toggler.addClass('selected');
            $(_this2).trigger(EVENT.VIEW_READY);
          }
        );
      }
    },
    {
      key: '_save',
      value: function _save(event) {
        var _this3 = this;

        event.preventDefault;

        /*
         * Certainly not a good place to put this logic but Chrome requires
         * permissions to be requested only in response of user input. So...
         */
        return this._saveOptions();
      }
    },
    {
      key: '_saveOptions',
      value: function _saveOptions() {
        var _this4 = this;

        var changes = {};
        this._eachOption(
          function($elm, key, value, cb) {
            var newValue = $elm.is(':checkbox') ? $elm.is(':checked') : $elm.val();
            if (value === newValue) return cb();
            changes[key] = [value, newValue];
            _this4.store.set(key, newValue, cb);
          },
          function() {
            _this4._toggle(false);
            if (Object.keys(changes).length) {
              $(_this4).trigger(EVENT.OPTS_CHANGE, changes);
            }
          }
        );
      }
    },
    {
      key: '_eachOption',
      value: function _eachOption(processFn, completeFn) {
        var _this5 = this;

        parallel(
          this.elements,
          function(elm, cb) {
            var $elm = $(elm);
            var key = STORE[$elm.data('store')];

            _this5.store.get(key, function(value) {
              processFn($elm, key, value, function() {
                return cb();
              });
            });
          },
          completeFn
        );
      }
    }
  ]);

  return OptionsView;
})();
('use strict');

// regexps from https://github.com/shockie/node-iniparser
var INI_SECTION = /^\s*\[\s*([^\]]*)\s*\]\s*$/;
var INI_COMMENT = /^\s*;.*$/;
var INI_PARAM = /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/;
var SEPARATOR = /\r\n|\r|\n/;

function parseGitmodules(data) {
  if (!data) return;

  var submodules = {};
  var lines = data.split(SEPARATOR);
  var lastPath = void 0;

  lines.forEach(function(line) {
    var match = void 0;
    if (INI_SECTION.test(line) || INI_COMMENT.test(line) || !(match = line.match(INI_PARAM))) {
      return;
    }

    if (match[1] === 'path') lastPath = match[2];
    else if (match[1] === 'url') submodules[lastPath] = match[2];
  });

  return submodules;
}
('use strict');

function parallel(arr, iter, done) {
  var total = arr.length;
  if (total === 0) return done();

  arr.forEach(function(item) {
    iter(item, finish);
  });

  function finish() {
    if (--total === 0) done();
  }
}
('use strict');

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Storage = (function() {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, [
    {
      key: 'set',
      value: function set(key, val, cb) {
        localStorage.setItem(key, JSON.stringify(val));
        if (cb) cb();
      }
    },
    {
      key: 'get',
      value: function get(key, cb) {
        var val = parse(localStorage.getItem(key));
        if (cb) cb(val);
        else return val;

        function parse(val) {
          try {
            return JSON.parse(val);
          } catch (e) {
            return val;
          }
        }
      }
    }
  ]);

  return Storage;
})();
('use strict');

$(document).ready(function() {
  var store = new Storage();

  parallel(Object.keys(STORE), setDefault, loadExtension);

  function setDefault(key, cb) {
    var storeKey = STORE[key];
    store.get(storeKey, function(val) {
      store.set(storeKey, val == null ? DEFAULTS[key] : val, cb);
    });
  }

  function createAdapter() {
    var normalizeUrl = function normalizeUrl(url) {
      return url.replace(/(.*?:\/\/[^/]+)(.*)/, '$1');
    };

    var githubUrls = store
      .get(STORE.GHEURLS)
      .split(/\n/)
      .map(normalizeUrl)
      .concat('https://github.com');

    var bitbucketUrls = ['https://bitbucket.org'];
    var oschinaUrls = [
      'http://git.oschina.net',
      'https://git.oschina.net',
      'http://gitee.com',
      'https://gitee.com'
    ];
    var currentUrl = location.protocol + '//' + location.host;

    if (oschinaUrls.indexOf(currentUrl) >= 0) {
      return new Oschina(store);
    } else if (~githubUrls.indexOf(currentUrl)) {
      return new GitHub(store);
    } else if (~bitbucketUrls.indexOf(currentUrl)) {
      return new Bitbucket(store);
    }
  }

  function loadExtension() {
    var $html = $('html');
    var $document = $(document);
    var $dom = $(TEMPLATE);
    var $sidebar = $dom.find('.octotree_sidebar');
    var $toggler = $sidebar.find('.octotree_toggle');
    var $views = $sidebar.find('.octotree_view');
    var adapter = createAdapter();
    var treeView = new TreeView($dom, store, adapter);
    var optsView = new OptionsView($dom, store);
    var helpPopup = new HelpPopup($dom, store);
    var errorView = new ErrorView($dom, store);
    var currRepo = false;
    var hasError = false;

    $html.addClass(ADDON_CLASS);

    $(window).resize(function(event) {
      if (event.target === window) layoutChanged();
    });

    $toggler.click(toggleSidebarAndSave);
    key.filter = function() {
      return $toggler.is(':visible');
    };
    key(store.get(STORE.HOTKEYS), toggleSidebarAndSave);

    var views = [treeView, errorView, optsView];
    views.forEach(function(view) {
      $(view)
        .on(EVENT.VIEW_READY, function(event) {
          if (this !== optsView) {
            $document.trigger(EVENT.REQ_END);
          }
          showView(this.$view);
        })
        .on(EVENT.VIEW_CLOSE, function() {
          return showView(hasError ? errorView.$view : treeView.$view);
        })
        .on(EVENT.OPTS_CHANGE, optionsChanged)
        .on(EVENT.FETCH_ERROR, function(event, err) {
          return showError(err);
        });
    });

    $document
      .on(EVENT.REQ_START, function() {
        return $toggler.addClass('octotree_loading');
      })
      .on(EVENT.REQ_END, function() {
        return $toggler.removeClass('octotree_loading');
      })
      .on(EVENT.LAYOUT_CHANGE, layoutChanged)
      .on(EVENT.TOGGLE, layoutChanged)
      .on(EVENT.LOC_CHANGE, function() {
        return tryLoadRepo();
      });

    $sidebar
      .width(parseInt(store.get(STORE.WIDTH)))
      .resize(layoutChanged)
      .appendTo($('body'));

    var prev = location.href;
    function aa() {
      setTimeout(function() {
        if (prev != location.href) {
          tryLoadRepo();
          prev = location.href;
        }
        aa();
      }, 500);
    }
    aa();
    adapter.init($sidebar);
    return tryLoadRepo();

    function optionsChanged(event, changes) {
      var reload = false;

      Object.keys(changes).forEach(function(storeKey) {
        var value = changes[storeKey];
        switch (storeKey) {
          case STORE.TOKEN:
          case STORE.LOADALL:
            reload = true;
            break;
          case STORE.HOTKEYS:
            key.unbind(value[0]);
            key(value[1], toggleSidebar);
            break;
        }
      });

      if (reload) {
        tryLoadRepo(true);
      }
    }

    function tryLoadRepo(reload) {
      hasError = false;
      var remember = store.get(STORE.REMEMBER);
      var showInNonCodePage = store.get(STORE.NONCODE);
      var shown = store.get(STORE.SHOWN);
      var token = store.get(STORE.TOKEN);

      adapter.getRepoFromPath(showInNonCodePage, currRepo, token, function(err, repo) {
        if (err) {
          showError(err);
        } else if (repo) {
          $toggler.show();

          if (remember && shown) {
            toggleSidebar(true);
          }

          if (isSidebarVisible()) {
            var replacer = ['username', 'reponame', 'branch'];
            var repoChanged = JSON.stringify(repo, replacer) !== JSON.stringify(currRepo, replacer);

            if (repoChanged || reload === true) {
              $document.trigger(EVENT.REQ_START);
              currRepo = repo;
              treeView.show(repo, token);
            } else {
              treeView.syncSelection();
            }
          }
        } else {
          $toggler.hide();
          toggleSidebar(false);
        }
        helpPopup.init();
        layoutChanged();
      });
    }

    function showView(view) {
      $views.removeClass('current');
      view.addClass('current');
    }

    function showError(err) {
      hasError = true;
      errorView.show(err);
    }

    function toggleSidebarAndSave() {
      store.set(STORE.SHOWN, !isSidebarVisible(), function() {
        toggleSidebar();
        if (isSidebarVisible()) {
          tryLoadRepo();
        }
      });
    }

    function toggleSidebar(visibility) {
      if (visibility !== undefined) {
        if (isSidebarVisible() === visibility) return;
        toggleSidebar();
      } else {
        $html.toggleClass(SHOW_CLASS);
        $document.trigger(EVENT.TOGGLE, isSidebarVisible());
      }
    }

    function layoutChanged() {
      var width = $sidebar.outerWidth();
      adapter.updateLayout(isTogglerVisible(), isSidebarVisible(), width);
      store.set(STORE.WIDTH, width);
    }

    function isSidebarVisible() {
      return $html.hasClass(SHOW_CLASS);
    }

    function isTogglerVisible() {
      return $toggler.is(':visible');
    }
  }
});
