(window.webpackJsonp = window.webpackJsonp || []).push([
	[0], {
		18: function(e, a, t) {
			e.exports = t.p + "static/media/close-icon.3fcc47fb.svg"
		},
		32: function(e, a, t) {
			e.exports = t.p + "static/media/bg-img.a24f336a.svg"
		},
		33: function(e, a, t) {
			e.exports = t.p + "static/media/logo-wordmark.d74d0984.svg"
		},
		37: function(e, a, t) {
			e.exports = t.p + "static/media/logo.d0e2d96d.svg"
		},
		38: function(e, a, t) {
			e.exports = t.p + "static/media/back-icon.79bb2c6d.svg"
		},
		40: function(e, a, t) {
			e.exports = t(76)
		},
		45: function(e, a, t) {},
		59: function(e, a, t) {},
		60: function(e, a, t) {},
		61: function(e, a, t) {},
		64: function(e, a, t) {},
		67: function(e, a, t) {},
		69: function(e, a, t) {},
		71: function(e, a, t) {},
		72: function(e, a, t) {},
		73: function(e, a, t) {},
		74: function(e, a, t) {},
		75: function(e, a, t) {},
		76: function(e, a, t) {
			"use strict";
			t.r(a);
			var n = t(0),
				o = t.n(n),
				i = t(28),
				r = t.n(i),
				c = (t(45), t(11)),
				s = t(14),
				p = t(39),
				l = t(2),
				m = t(3),
				u = t(5),
				d = t(4),
				h = t(6),
				g = t(32),
				f = t.n(g),
				v = t(33),
				b = t.n(v),
				y = (t(59), function(e) {
					function a() {
						return Object(l.a)(this, a), Object(u.a)(this, Object(d.a)(a).apply(this,
							arguments))
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							return o.a.createElement("div", {
								className: "header"
							}, o.a.createElement("img", {
								src: b.a,
								className: "header logo-img",
								alt: "background"
							}), o.a.createElement("img", {
								src: f.a,
								className: "header bg-img",
								alt: "background"
							}))
						}
					}]), a
				}(n.Component)),
				k = t(19);

			function w(e, a) {
				if (mixpanel && window.__mmMetametrics && mixpanel.track) {
					var t = e.category;
					delete e.category, mixpanel.track(t, Object(k.a)({}, e, a))
				}
			}
			var E = function(e, a, t) {
					return {
						category: e,
						action: a,
						name: t
					}
				},
				O = "Featured Dapp",
				C = "Dapp Category",
				j = "Homepage Tab",
				D = "Click",
				S = "Impression",
				A = "Browser Home",
				N = {
					CLICKS_DAPP: E(A, D, "Dapp"),
					CLICKS_FEATURED_DAPP: E(A, D, O),
					CLICKS_DAPP_CATEGORY: E(A, D, C),
					CLICKS_HOMEPAGE_TAB: E(A, D, j),
					IMPRESSION: E(A, S)
				},
				T = (t(60), function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] =
							arguments[i];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(
							o)))).onClick = function() {
							var e = t.props,
								a = e.label;
							(0, e.onClick)(a)
						}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							var e = this.onClick,
								a = this.props,
								t = a.activeTab,
								n = a.label,
								i = "tab-list-item";
							return t === n && (i += " tab-list-active"), o.a
								.createElement("li", {
									className: i,
									onClick: e
								}, n)
						}
					}]), a
				}(n.Component)),
				x = (t(61), function(e) {
					function a(e) {
						var t;
						Object(l.a)(this, a), (t = Object(u.a)(this, Object(d.a)(a).call(this, e)))
							.onTabSelected = function(e) {
								t.setState({
									activeTab: e
								}), w(N.CLICKS_HOMEPAGE_TAB, {
									Tab: e
								})
							};
						var n = e.children.find(function(e) {
							return !e.props.hide
						});
						return t.state = {
							activeTab: n.props.label
						}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							var e = this.onTabSelected,
								a = this.props.children,
								t = this.state.activeTab;
							return o.a.createElement("div", {
								className: "tabs"
							}, o.a.createElement("ol", {
								className: "tab-list"
							}, a.map(function(a) {
								var n = a.props,
									i = n.label;
								return n.hide ? null : o.a
									.createElement(T, {
										activeTab: t,
										key: i,
										label: i,
										onClick: e
									})
							})), o.a.createElement("div", {
								className: "tab-content"
							}, a.map(function(e) {
								return e.props.hide ? null : e.props
									.label === t ? e.props.children :
									void 0
							})))
						}
					}]), a
				}(n.Component)),
				F = t(34),
				_ = t.n(F);
			t(64);
			var M = function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] =
							arguments[i];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(o))))
							.state = {
								value: ""
							}, t.handleChange = function(e) {
								t.setState({
									value: e.target.value
								})
							}, t.onFocus = function(e) {
								e.preventDefault(), window.ethereum.send("metamask_showAutocomplete")
							}, t.handleSubmit = function(e) {
								e.preventDefault();
								var a = window.__mmSearchEngine || "DuckDuckGo",
									n = function(e) {
										var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[
												1] : "DuckDuckGo",
											t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[
												2] : "https://";
										if (null === e.match(
												/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:\/?#[\]@!&',;=.+]+$/g
												)) {
											var n = "https://www.google.com/search?q=" + escape(e);
											return "DuckDuckGo" === a && (n = "https://duckduckgo.com/?q=" +
												escape(e)), n
										}
										return e.match(/^[a-z]*:\/\//) ? e : "".concat(t).concat(e)
									}(t.state.value, a);
								window.location.href = n
							}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							return o.a.createElement("form", {
								className: "autocomplete",
								onSubmit: this.handleSubmit
							}, o.a.createElement("input", {
								autoCapitalize: "none",
								type: "text",
								placeholder: "Search or Type URL",
								className: "autocomplete-input",
								value: this.state.value,
								onChange: this.handleChange,
								onFocus: this.onFocus
							}))
						}
					}]), a
				}(n.Component),
				B = t(35),
				I = (t(67), function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] =
							arguments[i];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(
							o)))).track = function() {
							w(N.CLICKS_DAPP_CATEGORY, {
								Category: t.props.data.name
							})
						}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							var e = this.props.data,
								a = e.name,
								t = e.icon,
								n = e.color,
								i = "/".concat(a.toLowerCase().replace(" ", "-"));
							return o.a.createElement(c.b, {
								className: "dapp-category-container",
								to: i,
								onClick: this.track
							}, o.a.createElement("div", {
								className: "dapp-category"
							}, o.a.createElement(B.a, {
								className: "dapp-category-icon",
								icon: t,
								color: n
							}), o.a.createElement("span", {
								className: "dapp-category-name"
							}, a)))
						}
					}]), a
				}(n.Component)),
				z = t(16),
				P = t(17),
				L = t(12);
			z.b.add(L.b, L.c, L.a, L.e, L.f, L.h, L.d, L.g);
			var G = [{
					name: "Decentralized finance",
					displayIos: !1,
					icon: "money-bill-wave",
					color: "#5cd879",
					dapps: [{
						name: "Compound",
						url: "https://app.compound.finance/",
						description: "Earn interest on your ETH",
						icon: "./images/dapps/compound.finance.png"
					}, {
						name: "MakerDAO CDP",
						url: "https://oasis.app/",
						description: "Trade, borrow, and save using Dai",
						icon: "./images/dapps/cdp.makerdao.com.png"
					}, {
						name: "PoolTogether",
						url: "https://app.pooltogether.us/",
						description: "A prize-linked savings account. By saving money you have a chance to win prizes",
						icon: "./images/dapps/pooltogether.us.png"
					}, {
						name: "DeFi Saver",
						url: "https://defisaver.com/",
						description: "One-stop management solution for DeFi protocols",
						icon: "./images/dapps/defi_saver.png"
					}, {
						name: "pTokens",
						url: "https://dapp.ptokens.io/",
						description: "Make your crypto compatible with any blockchain!",
						icon: "./images/dapps/pTokens.png"
					}, {
						name: "Zapper",
						url: "https://zapper.fi",
						description: "Manage your DeFi assets and liabilities in one simple interface",
						icon: "./images/dapps/zapper.svg"
					}, {
						name: "Yearn",
						url: "https://yearn.finance/",
						description: "An ecosystem of aggregators that utilize lending services to optimize your token lending",
						icon: "./images/dapps/yearn.finance.png"
					}, {
						name: "Aave",
						url: "https://aave.com/",
						description: "An open-source, non-custodial protocol enabling the creation of money markets",
						icon: "./images/dapps/aave.svg"
					}, {
						name: "Zerion",
						url: "https://zerion.io/",
						description: "Zerion is the easiest way to build and manage your entire DeFi portfolio from one place",
						icon: "./images/dapps/zerion.io.png"
					}, {
						name: "Token Sets",
						url: "https://www.tokensets.com/",
						description: "Manage your crypto porfolio",
						icon: "./images/dapps/tokensets.com.png"
					}, {
						name: "Pickle Finance",
						url: "https://pickle.finance",
						description: "Stabilize stablecoins",
						icon: "./images/dapps/pickle.finance.jpeg"
					}, {
						name: "Nexus Mutual",
						url: "https://nexusmutual.io/",
						description: "A people-powered alternative to insurance",
						icon: "./images/dapps/nexusmutual.io.png"
					}, {
						name: "Curve",
						url: "https://www.curve.fi/",
						description: "Creating deep on-chain liquidity using advanced bonding curves",
						icon: "./images/dapps/curve.fi.png"
					}]
				}, {
					name: "Decentralized exchanges",
					displayIos: !1,
					icon: "exchange-alt",
					color: "#bbb9f3",
					dapps: [{
						name: "Uniswap",
						url: "https://uniswap.exchange/",
						description: "Swap and trade tokens",
						icon: "./images/dapps/uniswap.exchange.png"
					}, {
						name: "dYdX",
						url: "https://trade.dydx.exchange/",
						description: "A decentralized and non-custodial trading platform offering perpetual margin, and spot trading",
						icon: "./images/dapps/dydx.png"
					}, {
						name: "Kyber Swap",
						url: "https://kyberswap.com/",
						description: "A simple way to exchange tokens",
						icon: "./images/dapps/kyber.network.png"
					}, {
						name: "Tokenlon",
						url: "https://tokenlon.im/",
						description: "Tokenlon DEX, powered by 0x protocol",
						icon: "./images/dapps/tokenlon.png"
					}, {
						name: "1inch",
						url: "https://1inch.exchange",
						description: "1inch is a DEX aggregator with the best DEX prices and single point of entry for DeFi",
						icon: "./images/dapps/1inch.svg"
					}, {
						name: "Totle Swap",
						url: "https://totle.exchange",
						description: "Swap any ERC-20 token at the best price",
						icon: "./images/dapps/totle.jpeg"
					}, {
						name: "Radar Relay",
						url: "https://relay.radar.tech/",
						description: "Simple and secure wallet to wallet trading with the best prices in DeFi",
						icon: "./images/dapps/radar_relay.png"
					}, {
						name: "AirSwap",
						url: "https://instant.airswap.io/",
						description: "Trade Tokens Easily, Securely, & Without Trading Fees",
						icon: "./images/dapps/instant.airswap.io.png"
					}, {
						name: "Balancer",
						url: "https://balancer.exchange/#/swap",
						description: "Swap ERC20 tokens trustlessly across all Balancer liquidity pools.balancer.exchange",
						icon: "./images/dapps/balancer.exchange.png"
					}, {
						name: "Matcha",
						url: "https://matcha.xyz/",
						description: "Simple crypto trading for everyone",
						icon: "./images/dapps/matcha.png"
					}]
				}, {
					name: "Art & collectibles",
					displayIos: !1,
					icon: "store",
					color: "#F29D62",
					dapps: [{
						name: "miime",
						url: "https://miime.io/",
						description: "miime is an NFT marketplace catering to blockchain gamers in Japan and across the world",
						icon: "./images/dapps/miime.png"
					}, {
						name: "Mintable",
						url: "https://mintable.app",
						description: "Mintable is a next generation NFT marketplace, the easiest place to trade NFTs and create your own.",
						icon: "./images/dapps/mintable.png"
					}, {
						name: "OpenSea",
						url: "https://opensea.io/",
						description: "Buy, sell, and discover rare digital items",
						icon: "./images/dapps/opensea.io.png"
					}, {
						name: "KnownOrigin",
						url: "https://knownorigin.io/",
						description: "Discover and collect rare digital artwork",
						icon: "./images/dapps/known_origin.png"
					}, {
						name: "Mintbase",
						url: "https://mintbase.io",
						description: "Leading non-fungible token creation tool and marketplace",
						icon: "./images/dapps/mintbase.png"
					}, {
						name: "Axie Infinity",
						url: "https://axieinfinity.com/#",
						description: "Collect and raise fantasy creatures called Axie",
						icon: "./images/dapps/axieinfinity.com.png"
					}, {
						name: "Sorare",
						url: "https://sorare.com/",
						description: "Global Fantasy Football. Collect limited edition digital collectibles",
						icon: "./images/dapps/sorare.jpg"
					}, {
						name: "Clovers Network",
						url: "https://clovers.network",
						description: "Discover, collect & trade cryptographic icons",
						icon: "./images/dapps/clovers.png"
					}, {
						name: "CryptoKitties",
						url: "https://www.cryptokitties.co/",
						description: "Collect, breed and trade unique CryptoKitties",
						icon: "./images/dapps/cryptokitties.co.png"
					}, {
						name: "Super Rare",
						url: "https://superrare.co/",
						description: "Discover and collect digital artworks",
						icon: "./images/dapps/superrare.co.jpg"
					}, {
						name: "Rarible",
						url: "https://rarible.com/",
						description: "Create and sell digital collectibles",
						icon: "./images/dapps/rarible.com.jpg"
					}, {
						name: "Makersplace",
						url: "https://makersplace.com/",
						description: "Collect truly rare digital artworks",
						icon: "./images/dapps/makersplace.com.jpg"
					}, {
						name: "My Crypto Heroes",
						url: "https://www.mycryptoheroes.net/home",
						description: "Collect and battle heroes",
						icon: "./images/dapps/my_crypto_heroes.jpg"
					}, {
						name: "CryptoDozer Marketplace",
						url: "https://market.playdapp.io",
						description: "From sales to purchases, marketplace is reliable and fast",
						icon: "./images/dapps/cryptodozer.io.png"
					}, {
						name: "Brave Frontier Heroes",
						url: "https://bravefrontierheroes.com",
						description: "Use heroes in turn-based quests and battles.",
						icon: "./images/dapps/brave_frontier_heroes.png"
					}, {
						name: "Blockchain Cuties",
						url: "https://blockchaincuties.com/",
						description: "Cuties are cats, dogs, and bears that go on adventures.",
						icon: "./images/dapps/blockchaincuties.com.png"
					}, {
						name: "F1 Delta Time",
						url: "https://www.f1deltatime.com/",
						description: "Own F1 Delta collectibles & stake to earn",
						icon: "./images/dapps/f1deltatime.com.png"
					}, {
						name: "MegaCryptoPolis",
						url: "http://mcp3d.com",
						description: "Collect land and build a blockchain city.",
						icon: "./images/dapps/megacryptopolis.png"
					}]
				}, {
					name: "Get crypto",
					displayIos: !1,
					icon: "credit-card",
					color: "#1098FC",
					dapps: [{
						name: "Gitcoin",
						url: "https://gitcoin.co/",
						description: "Get paid in crypto for working on open source projects",
						icon: "./images/dapps/gitcoin.co.png"
					}, {
						name: "Local Ethereum",
						url: "https://localethereum.com/",
						description: "Get ETH peer-to-peer in over 130 countries",
						icon: "./images/dapps/localethereum.com.png"
					}, {
						name: "Cent",
						url: "https://beta.cent.co/",
						description: "Earn ETH by creating content",
						icon: "./images/dapps/cent.co.png"
					}]
				}, {
					name: "Developer tools",
					displayIos: !1,
					icon: "wrench",
					color: "#838c96",
					dapps: [{
						name: "Ethereum Name Service",
						url: "https://app.ens.domains/",
						description: "Have one name for all your cryptocurrency wallets, a decentralised website, & more",
						icon: "./images/dapps/ens.jpg"
					}, {
						name: "Gnosis Safe Multisig",
						url: "https://gnosis-safe.io/app/#/",
						description: "Manage digital assets collectively",
						icon: "./images/dapps/gnosis_safe.png"
					}, {
						name: "Microsponsors",
						url: "https://microsponsors.io",
						description: "Microsponsors is an auction house for tokenized Time",
						icon: "./images/dapps/microsponsors.png"
					}, {
						name: "MythX",
						url: "https://mythx.io/",
						description: "Smart contract security service for Ethereum",
						icon: "./images/dapps/mythx.png"
					}]
				}, {
					name: "Social",
					displayIos: !1,
					icon: "comment-alt",
					color: "#F8CD45",
					dapps: [{
						name: "3Box",
						url: "https://3box.io/hub",
						description: "Social profiles for Ethereum",
						icon: "./images/dapps/3box.io.png"
					}, {
						name: "Kauri",
						url: "https://kauri.io/",
						description: "Ethereum dev content in a decentralized knowledge base",
						icon: "./images/dapps/kauri.io.png"
					}, {
						name: "FOAM",
						url: "https://map.foam.space",
						description: "Create, curate, and search a consensus-driven map",
						icon: "./images/dapps/foam.space.png"
					}, {
						name: "Aragon",
						url: "https://aragon.org/discover/",
						description: "Create and manage communities, companies, organizations",
						icon: "./images/dapps/aragon.org.png"
					}]
				}, {
					name: "Markets",
					displayIos: !1,
					icon: "newspaper",
					color: "#FF849A",
					dapps: [{
						name: "Popula",
						url: "https://popula.com/",
						description: "News powered by Civil and Ethereum",
						icon: "./images/dapps/popula.com.png"
					}, {
						name: "CoinDesk",
						url: "https://www.coindesk.com/",
						description: "Blockchain news",
						icon: "./images/dapps/coindesk.com.png"
					}, {
						name: "CoinGecko",
						url: "https://www.coingecko.com/en",
						description: "Cryptocurrency Prices & Market Capitalization",
						icon: "./images/dapps/coingecko.com.png"
					}, {
						name: "DeCrypt",
						url: "https://decrypt.co/",
						description: "News about Ethereum, Bitcoin and Web3",
						icon: "./images/dapps/decrypt.co.jpg"
					}, {
						name: "Defipulse",
						url: "https://defipulse.com/",
						description: "The analytics + rankings hub for DeFi",
						icon: "./images/dapps/defipulse.com.png"
					}]
				}].filter(function(e) {
					var a = e.displayIos,
						t = void 0 === a || a;
					return !(P.isIOS && !t)
				}),
				K = (t(69), function(e) {
					function a() {
						return Object(l.a)(this, a), Object(u.a)(this, Object(d.a)(a).apply(this,
							arguments))
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							return o.a.createElement("div", {
								className: "explore-dapps"
							}, G.map(function(e) {
								return o.a.createElement(I, {
									data: e,
									key: e.name
								})
							}))
						}
					}]), a
				}(n.Component)),
				R = t(24),
				H = t.n(R),
				q = t(36),
				U = t(18),
				W = t.n(U),
				X = (t(71), function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] =
							arguments[r];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(
							i)))).track = function(e) {
							e.preventDefault(), w(N.CLICKS_DAPP, {
								Dapp: t.props.data.name,
								Url: t.props.data.url,
								Position: t.props.position + 1
							}), window.location.href = t.props.data.url
						}, t.renderDescription = function(e) {
							return e && o.a.createElement("p", {
								className: "dapp-desc"
							}, e)
						}, t.onClose = function(e) {
							e.preventDefault(), t.props.onClose(t.props.data.url)
						}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							var e = this.props,
								a = e.size,
								t = e.closable,
								n = e.data,
								i = n.name,
								r = n.description,
								c = n.url,
								s = n.icon;
							return o.a.createElement("a", {
								className: "dapp",
								href: c,
								onClick: this.track
							}, o.a.createElement("img", {
								src: s,
								className: "dapp-logo ".concat("small" ===
									a ? "dapp-logo-small" : ""),
								alt: "".concat(i, " logo")
							}), o.a.createElement("div", {
									className: "dapp-content"
								}, o.a.createElement("p", {
									className: "dapp-name ".concat(
										"small" === a ?
										"dapp-name-small" : "")
								}, i), r ? this.renderDescription(r) : null, o.a
								.createElement("span", {
									className: "dapp-url"
								}, c)), t && o.a.createElement("button", {
								className: "dapp-close",
								onClick: this.onClose
							}, o.a.createElement("img", {
								src: W.a,
								alt: "close button"
							})))
						}
					}]), a
				}(n.Component)),
				J = (t(72), function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] =
							arguments[i];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(
							o)))).state = {
							favorites: []
						}, t.onClose = function() {
							var e = Object(q.a)(H.a.mark(function e(a) {
								var n, o;
								return H.a.wrap(function(e) {
									for (;;) switch (e.prev = e.next) {
										case 0:
											return e.next = 2, window
												.ethereum.send(
													"metamask_removeFavorite",
													[a]);
										case 2:
											n = e.sent, o = n.favorites, t
												.setState({
													favorites: o
														.reverse()
												});
										case 5:
										case "end":
											return e.stop()
									}
								}, e)
							}));
							return function(a) {
								return e.apply(this, arguments)
							}
						}(), t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "componentDidMount",
						value: function() {
							var e = this;
							window.__mmFavorites && this.setState({
								favorites: window.__mmFavorites
							}), window.addEventListener("message", function() {
								window.__mmFavorites && JSON.stringify(e.state
									.favorites) !== JSON.stringify(window
									.__mmFavorites) && e.setState({
									favorites: window.__mmFavorites
								})
							})
						}
					}, {
						key: "renderFavorites",
						value: function() {
							var e = this;
							return o.a.createElement("div", {
								className: "favorites"
							}, this.state.favorites.map(function(a, t) {
								return o.a.createElement(X, {
									data: Object(k.a)({}, a, {
										icon: "https://api.faviconkit.com/"
											.concat((n = a
													.url,
													new _.a(
														n)
													.hostname
													),
												"/64"),
										description: null
									}),
									key: "fav-".concat(a.url),
									size: "small",
									closable: !0,
									onClose: e.onClose,
									position: t
								});
								var n
							}))
						}
					}, {
						key: "renderEmpty",
						value: function() {
							return o.a.createElement("div", {
								className: "favorites-empty"
							}, o.a.createElement("p", null,
								"You have no favorites yet"))
						}
					}, {
						key: "render",
						value: function() {
							return this.state.favorites && this.state.favorites.length ?
								this.renderFavorites() : this.renderEmpty()
						}
					}]), a
				}(n.Component)),
				Y = t(37),
				Z = t.n(Y),
				$ = (t(73), function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] =
							arguments[i];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(
							o)))).state = {
							hideTutorialBanner: localStorage.getItem("hideTutorialBanner")
						}, t.hideBanner = function() {
							localStorage.setItem("hideTutorialBanner", "true"), t.setState({
								hideTutorialBanner: !0
							})
						}, t.showTutorial = function(e) {
							e.preventDefault(), window.ethereum.send("metamask_showTutorial")
						}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							return this.state.hideTutorialBanner ? null : o.a
								.createElement("div", {
									className: "take-a-tour-wrapper"
								}, o.a.createElement("a", {
									className: "take-a-tour",
									href: "#metamask-tutorial",
									onClick: this.showTutorial
								}, o.a.createElement("img", {
									src: Z.a,
									className: "take-a-tour-logo",
									alt: "MetaMask logo"
								}), o.a.createElement("div", {
									className: "take-a-tour-content"
								}, o.a.createElement("h3", null,
									"Take a tour"), o.a.createElement("p",
									null,
									"Our new mobile app gives you the control to access the new decentralized web"
									))), o.a.createElement("button", {
									className: "take-a-tour-close",
									onClick: this.hideBanner
								}, o.a.createElement("img", {
									src: W.a,
									alt: "close button"
								})))
						}
					}]), a
				}(n.Component)),
				Q = {
					Android: function() {
						return navigator.userAgent.match(/Android/i)
					},
					BlackBerry: function() {
						return navigator.userAgent.match(/BlackBerry/i)
					},
					iOS: function() {
						return navigator.userAgent.match(/iPhone|iPad|iPod/i)
					},
					Opera: function() {
						return navigator.userAgent.match(/Opera Mini/i)
					},
					Windows: function() {
						return navigator.userAgent.match(/IEMobile/i)
					},
					any: function() {
						return Q.Android() || Q.BlackBerry() || Q.iOS() || Q.Opera() || Q.Windows()
					}
				},
				V = function(e) {
					function a() {
						return Object(l.a)(this, a), Object(u.a)(this, Object(d.a)(a).apply(this,
							arguments))
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "componentDidMount",
						value: function() {
							w(N.IMPRESSION)
						}
					}, {
						key: "render",
						value: function() {
							return o.a.createElement("div", null, o.a.createElement(y,
								null), o.a.createElement(M, null), o.a.createElement(x,
									null, o.a.createElement("div", {
										label: "Explore sites",
										hide: P.isIOS
									}, o.a.createElement(K, null)), o.a.createElement(
										"div", {
											label: "Favorites"
										}, o.a.createElement(J, null))), Q.any() ? o.a
								.createElement($, null) : "")
						}
					}]), a
				}(n.Component),
				ee = t(38),
				ae = t.n(ee),
				te = (t(74), function(e) {
					function a() {
						return Object(l.a)(this, a), Object(u.a)(this, Object(d.a)(a).apply(this,
							arguments))
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "render",
						value: function() {
							var e = this.props.title;
							return o.a.createElement("div", {
								className: "navbar"
							}, o.a.createElement(c.b, {
								to: "/",
								className: "navbar-back"
							}, o.a.createElement("img", {
								src: ae.a,
								alt: "go back"
							})), o.a.createElement("h1", null, e))
						}
					}]), a
				}(n.Component)),
				ne = function(e) {
					function a() {
						var e, t;
						Object(l.a)(this, a);
						for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] =
							arguments[i];
						return (t = Object(u.a)(this, (e = Object(d.a)(a)).call.apply(e, [this].concat(o))))
							.state = {
								category: null
							}, t
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "componentDidMount",
						value: function() {
							var e = this,
								a = G.find(function(a) {
									return a.name.toLowerCase().replace(" ", "-") === e
										.props.match.params.category
								});
							a && this.setState({
								category: a
							})
						}
					}, {
						key: "render",
						value: function() {
							var e = (this.state || {}).category;
							return e ? o.a.createElement("div", null, o.a.createElement(
							te, {
								title: e.name
							}), o.a.createElement("div", {
								className: "category-wrapper"
							}, e.dapps.sort(function(e, a) {
								return e.name.charCodeAt(0) - a.name
									.charCodeAt(0)
							}).map(function(e, a) {
								return o.a.createElement(X, {
									data: e,
									key: e.url,
									position: a
								})
							}))) : null
						}
					}]), a
				}(n.Component),
				oe = function(e) {
					function a() {
						return Object(l.a)(this, a), Object(u.a)(this, Object(d.a)(a).apply(this,
							arguments))
					}
					return Object(h.a)(a, e), Object(m.a)(a, [{
						key: "componentDidUpdate",
						value: function(e) {
							this.props.location.pathname !== e.location.pathname && window
								.scrollTo(0, 0)
						}
					}, {
						key: "render",
						value: function() {
							return this.props.children
						}
					}]), a
				}(n.Component),
				ie = Object(s.f)(oe);
			t(75);
			var re = function() {
				return o.a.createElement(c.a, null, o.a.createElement(ie, null, o.a.createElement(
				"div", {
					className: "App"
				}, o.a.createElement(s.a, {
					exact: !0,
					path: "/",
					component: V
				}), o.a.createElement("div", {
					className: "animated-wrapper-rule"
				}, o.a.createElement(p.a, {
					path: "/:category",
					component: ne,
					atEnter: {
						offset: 50,
						opacity: 0
					},
					atLeave: {
						offset: 150,
						opacity: 1
					},
					atActive: {
						offset: 0,
						opacity: 1
					},
					mapStyles: function(e) {
						return {
							transform: "translateX(".concat(e.offset, "%)")
						}
					}
				})))))
			};
			Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname ||
				window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
				);
			r.a.render(o.a.createElement(re, null), document.getElementById("root")), document
				.addEventListener("touchstart", function() {}, !0), "serviceWorker" in navigator &&
				navigator.serviceWorker.ready.then(function(e) {
					e.unregister()
				})
		}
	},
	[
		[40, 1, 2]
	]
]);
//# sourceMappingURL=main.ac70d34a.chunk.js.map
