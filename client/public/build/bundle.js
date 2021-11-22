
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function dataset_dev(node, property, value) {
        node.dataset[property] = value;
        dispatch_dev('SvelteDOMSetDataset', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Cardback.svelte generated by Svelte v3.44.1 */

    const file$9 = "src/Cardback.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "images/logo-sideways.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "id", "cardback-img");
    			attr_dev(img, "alt", "...");
    			attr_dev(img, "class", "svelte-1bcq0kv");
    			add_location(img, file$9, 1, 4, 45);
    			attr_dev(div, "class", "card svelte-1bcq0kv");
    			set_style(div, "width", "25rem");
    			add_location(div, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cardback', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cardback> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Cardback extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cardback",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/Card.svelte generated by Svelte v3.44.1 */

    const file$8 = "src/Card.svelte";

    function create_fragment$8(ctx) {
    	let head;
    	let link;
    	let t0;
    	let div3;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let img1;
    	let img1_src_value;
    	let t2;
    	let img2;
    	let img2_src_value;
    	let t3;
    	let div2;
    	let h5;
    	let t4;
    	let t5;
    	let h60;
    	let t6;
    	let t7;
    	let t8;
    	let t9;
    	let h61;
    	let t10;
    	let t11;
    	let t12;
    	let t13;
    	let div1;
    	let p;
    	let t14;
    	let br;
    	let t15;
    	let t16;

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			div3 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t1 = space();
    			img1 = element("img");
    			t2 = space();
    			img2 = element("img");
    			t3 = space();
    			div2 = element("div");
    			h5 = element("h5");
    			t4 = text(/*Name*/ ctx[3]);
    			t5 = space();
    			h60 = element("h6");
    			t6 = text(/*Astro*/ ctx[4]);
    			t7 = text("  |  ");
    			t8 = text(/*Personality*/ ctx[5]);
    			t9 = space();
    			h61 = element("h6");
    			t10 = text(/*Age*/ ctx[6]);
    			t11 = text(", ");
    			t12 = text(/*Gender*/ ctx[7]);
    			t13 = space();
    			div1 = element("div");
    			p = element("p");
    			t14 = text("About Me: ");
    			br = element("br");
    			t15 = space();
    			t16 = text(/*Bio*/ ctx[8]);
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
    			attr_dev(link, "crossorigin", "anonymous");
    			add_location(link, file$8, 1, 4, 12);
    			add_location(head, file$8, 0, 0, 0);
    			if (!src_url_equal(img0.src, img0_src_value = /*AstroPic*/ ctx[1])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "id", "card-img-top1");
    			attr_dev(img0, "alt", "...");
    			attr_dev(img0, "class", "svelte-xsaal0");
    			add_location(img0, file$8, 22, 8, 675);
    			if (!src_url_equal(img1.src, img1_src_value = /*Picture*/ ctx[0])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "id", "card-img-top2");
    			attr_dev(img1, "alt", "...");
    			attr_dev(img1, "class", "svelte-xsaal0");
    			add_location(img1, file$8, 23, 8, 734);
    			if (!src_url_equal(img2.src, img2_src_value = /*PersonalityPic*/ ctx[2])) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "id", "card-img-top3");
    			attr_dev(img2, "alt", "...");
    			attr_dev(img2, "class", "svelte-xsaal0");
    			add_location(img2, file$8, 24, 8, 793);
    			attr_dev(div0, "class", "pics svelte-xsaal0");
    			add_location(div0, file$8, 21, 4, 647);
    			attr_dev(h5, "class", "card-title svelte-xsaal0");
    			add_location(h5, file$8, 27, 4, 895);
    			attr_dev(h60, "class", "card-subtitle mb-2 text-muted svelte-xsaal0");
    			add_location(h60, file$8, 28, 4, 935);
    			attr_dev(h61, "class", "card-subtitle mb-2 text-muted svelte-xsaal0");
    			add_location(h61, file$8, 29, 4, 1013);
    			add_location(br, file$8, 31, 43, 1156);
    			attr_dev(p, "class", "card-text svelte-xsaal0");
    			add_location(p, file$8, 31, 12, 1125);
    			attr_dev(div1, "class", "bottom-text svelte-xsaal0");
    			add_location(div1, file$8, 30, 8, 1085);
    			attr_dev(div2, "class", "card-body svelte-xsaal0");
    			add_location(div2, file$8, 26, 4, 866);
    			attr_dev(div3, "class", "card svelte-xsaal0");
    			set_style(div3, "width", "25rem");
    			add_location(div3, file$8, 20, 0, 601);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, img0);
    			append_dev(div0, t1);
    			append_dev(div0, img1);
    			append_dev(div0, t2);
    			append_dev(div0, img2);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, h5);
    			append_dev(h5, t4);
    			append_dev(div2, t5);
    			append_dev(div2, h60);
    			append_dev(h60, t6);
    			append_dev(h60, t7);
    			append_dev(h60, t8);
    			append_dev(div2, t9);
    			append_dev(div2, h61);
    			append_dev(h61, t10);
    			append_dev(h61, t11);
    			append_dev(h61, t12);
    			append_dev(div2, t13);
    			append_dev(div2, div1);
    			append_dev(div1, p);
    			append_dev(p, t14);
    			append_dev(p, br);
    			append_dev(p, t15);
    			append_dev(p, t16);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*AstroPic*/ 2 && !src_url_equal(img0.src, img0_src_value = /*AstroPic*/ ctx[1])) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty & /*Picture*/ 1 && !src_url_equal(img1.src, img1_src_value = /*Picture*/ ctx[0])) {
    				attr_dev(img1, "src", img1_src_value);
    			}

    			if (dirty & /*PersonalityPic*/ 4 && !src_url_equal(img2.src, img2_src_value = /*PersonalityPic*/ ctx[2])) {
    				attr_dev(img2, "src", img2_src_value);
    			}

    			if (dirty & /*Name*/ 8) set_data_dev(t4, /*Name*/ ctx[3]);
    			if (dirty & /*Astro*/ 16) set_data_dev(t6, /*Astro*/ ctx[4]);
    			if (dirty & /*Personality*/ 32) set_data_dev(t8, /*Personality*/ ctx[5]);
    			if (dirty & /*Age*/ 64) set_data_dev(t10, /*Age*/ ctx[6]);
    			if (dirty & /*Gender*/ 128) set_data_dev(t12, /*Gender*/ ctx[7]);
    			if (dirty & /*Bio*/ 256) set_data_dev(t16, /*Bio*/ ctx[8]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Card', slots, []);
    	let { Picture = 'images/default_profile_pics/no-user.png' } = $$props;
    	let { AstroPic } = $$props;
    	let { PersonalityPic } = $$props;
    	let { Name = "No Name" } = $$props;
    	let { Astro = "None" } = $$props;
    	let { Personality = "None" } = $$props;
    	let { Age = 0 } = $$props;
    	let { Gender = "None" } = $$props;
    	let { Bio = "No info!!" } = $$props;

    	const writable_props = [
    		'Picture',
    		'AstroPic',
    		'PersonalityPic',
    		'Name',
    		'Astro',
    		'Personality',
    		'Age',
    		'Gender',
    		'Bio'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('Picture' in $$props) $$invalidate(0, Picture = $$props.Picture);
    		if ('AstroPic' in $$props) $$invalidate(1, AstroPic = $$props.AstroPic);
    		if ('PersonalityPic' in $$props) $$invalidate(2, PersonalityPic = $$props.PersonalityPic);
    		if ('Name' in $$props) $$invalidate(3, Name = $$props.Name);
    		if ('Astro' in $$props) $$invalidate(4, Astro = $$props.Astro);
    		if ('Personality' in $$props) $$invalidate(5, Personality = $$props.Personality);
    		if ('Age' in $$props) $$invalidate(6, Age = $$props.Age);
    		if ('Gender' in $$props) $$invalidate(7, Gender = $$props.Gender);
    		if ('Bio' in $$props) $$invalidate(8, Bio = $$props.Bio);
    	};

    	$$self.$capture_state = () => ({
    		Picture,
    		AstroPic,
    		PersonalityPic,
    		Name,
    		Astro,
    		Personality,
    		Age,
    		Gender,
    		Bio
    	});

    	$$self.$inject_state = $$props => {
    		if ('Picture' in $$props) $$invalidate(0, Picture = $$props.Picture);
    		if ('AstroPic' in $$props) $$invalidate(1, AstroPic = $$props.AstroPic);
    		if ('PersonalityPic' in $$props) $$invalidate(2, PersonalityPic = $$props.PersonalityPic);
    		if ('Name' in $$props) $$invalidate(3, Name = $$props.Name);
    		if ('Astro' in $$props) $$invalidate(4, Astro = $$props.Astro);
    		if ('Personality' in $$props) $$invalidate(5, Personality = $$props.Personality);
    		if ('Age' in $$props) $$invalidate(6, Age = $$props.Age);
    		if ('Gender' in $$props) $$invalidate(7, Gender = $$props.Gender);
    		if ('Bio' in $$props) $$invalidate(8, Bio = $$props.Bio);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [Picture, AstroPic, PersonalityPic, Name, Astro, Personality, Age, Gender, Bio];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			Picture: 0,
    			AstroPic: 1,
    			PersonalityPic: 2,
    			Name: 3,
    			Astro: 4,
    			Personality: 5,
    			Age: 6,
    			Gender: 7,
    			Bio: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*AstroPic*/ ctx[1] === undefined && !('AstroPic' in props)) {
    			console.warn("<Card> was created without expected prop 'AstroPic'");
    		}

    		if (/*PersonalityPic*/ ctx[2] === undefined && !('PersonalityPic' in props)) {
    			console.warn("<Card> was created without expected prop 'PersonalityPic'");
    		}
    	}

    	get Picture() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Picture(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get AstroPic() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set AstroPic(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get PersonalityPic() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set PersonalityPic(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Name() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Name(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Astro() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Astro(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Personality() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Personality(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Age() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Age(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Gender() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Gender(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Bio() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Bio(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Buy_pack.svelte generated by Svelte v3.44.1 */

    const file$7 = "src/Buy_pack.svelte";

    function create_fragment$7(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let br;
    	let t1;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			br = element("br");
    			t1 = space();
    			button = element("button");
    			button.textContent = "Buy Pack!";
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "resize svelte-ws1sp3");
    			attr_dev(img, "alt", "Buy a pack here!");
    			add_location(img, file$7, 9, 0, 156);
    			add_location(br, file$7, 10, 0, 207);
    			attr_dev(button, "class", "button svelte-ws1sp3");
    			add_location(button, file$7, 11, 0, 212);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*buyPackHandler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Buy_pack', slots, []);
    	let { packCount } = $$props;
    	let src = "images/buy-pack.jpg";

    	function buyPackHandler() {
    		$$invalidate(2, packCount += 1);
    	}

    	const writable_props = ['packCount'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Buy_pack> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('packCount' in $$props) $$invalidate(2, packCount = $$props.packCount);
    	};

    	$$self.$capture_state = () => ({ packCount, src, buyPackHandler });

    	$$self.$inject_state = $$props => {
    		if ('packCount' in $$props) $$invalidate(2, packCount = $$props.packCount);
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, buyPackHandler, packCount];
    }

    class Buy_pack extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { packCount: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Buy_pack",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*packCount*/ ctx[2] === undefined && !('packCount' in props)) {
    			console.warn("<Buy_pack> was created without expected prop 'packCount'");
    		}
    	}

    	get packCount() {
    		throw new Error("<Buy_pack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set packCount(value) {
    		throw new Error("<Buy_pack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Open_pack.svelte generated by Svelte v3.44.1 */

    const file$6 = "src/Open_pack.svelte";

    function create_fragment$6(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let br;
    	let t1;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			br = element("br");
    			t1 = space();
    			button = element("button");
    			button.textContent = "Open Pack!";
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Open a pack here!");
    			add_location(img, file$6, 11, 0, 257);
    			add_location(br, file$6, 12, 0, 294);
    			add_location(button, file$6, 13, 0, 299);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*openPackHandler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Open_pack', slots, []);
    	let src = "images/astro-card.webp";
    	let { page = "Packs" } = $$props;

    	//Need to call backend function to create a pack
    	function openPackHandler() {
    		$$invalidate(2, page = "OpenPacks");
    	} //console.log("Open pack.");

    	const writable_props = ['page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Open_pack> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(2, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({ src, page, openPackHandler });

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('page' in $$props) $$invalidate(2, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, openPackHandler, page];
    }

    class Open_pack extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { page: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Open_pack",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get page() {
    		throw new Error("<Open_pack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Open_pack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Packs.svelte generated by Svelte v3.44.1 */
    const file$5 = "src/Packs.svelte";

    function create_fragment$5(ctx) {
    	let section0;
    	let div0;
    	let t0;
    	let t1;
    	let t2;
    	let br0;
    	let t3;
    	let br1;
    	let t4;
    	let section1;
    	let div3;
    	let div1;
    	let open_pack;
    	let updating_page;
    	let t5;
    	let div2;
    	let buy_pack;
    	let updating_packCount;
    	let current;

    	function open_pack_page_binding(value) {
    		/*open_pack_page_binding*/ ctx[2](value);
    	}

    	let open_pack_props = {};

    	if (/*page*/ ctx[1] !== void 0) {
    		open_pack_props.page = /*page*/ ctx[1];
    	}

    	open_pack = new Open_pack({ props: open_pack_props, $$inline: true });
    	binding_callbacks.push(() => bind(open_pack, 'page', open_pack_page_binding));

    	function buy_pack_packCount_binding(value) {
    		/*buy_pack_packCount_binding*/ ctx[3](value);
    	}

    	let buy_pack_props = {};

    	if (/*packCount*/ ctx[0] !== void 0) {
    		buy_pack_props.packCount = /*packCount*/ ctx[0];
    	}

    	buy_pack = new Buy_pack({ props: buy_pack_props, $$inline: true });
    	binding_callbacks.push(() => bind(buy_pack, 'packCount', buy_pack_packCount_binding));

    	const block = {
    		c: function create() {
    			section0 = element("section");
    			div0 = element("div");
    			t0 = text("Packs remaining: ");
    			t1 = text(/*packCount*/ ctx[0]);
    			t2 = space();
    			br0 = element("br");
    			t3 = space();
    			br1 = element("br");
    			t4 = space();
    			section1 = element("section");
    			div3 = element("div");
    			div1 = element("div");
    			create_component(open_pack.$$.fragment);
    			t5 = space();
    			div2 = element("div");
    			create_component(buy_pack.$$.fragment);
    			attr_dev(div0, "class", "pack-remains svelte-oecmhk");
    			add_location(div0, file$5, 10, 4, 268);
    			add_location(br0, file$5, 13, 4, 347);
    			add_location(br1, file$5, 14, 4, 356);
    			add_location(section0, file$5, 9, 0, 254);
    			attr_dev(div1, "class", "open-pack");
    			add_location(div1, file$5, 19, 8, 424);
    			attr_dev(div2, "class", "buy-pack");
    			add_location(div2, file$5, 23, 8, 514);
    			attr_dev(div3, "class", "grid-container svelte-oecmhk");
    			add_location(div3, file$5, 18, 4, 387);
    			add_location(section1, file$5, 17, 0, 373);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(section0, t2);
    			append_dev(section0, br0);
    			append_dev(section0, t3);
    			append_dev(section0, br1);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, div3);
    			append_dev(div3, div1);
    			mount_component(open_pack, div1, null);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			mount_component(buy_pack, div2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*packCount*/ 1) set_data_dev(t1, /*packCount*/ ctx[0]);
    			const open_pack_changes = {};

    			if (!updating_page && dirty & /*page*/ 2) {
    				updating_page = true;
    				open_pack_changes.page = /*page*/ ctx[1];
    				add_flush_callback(() => updating_page = false);
    			}

    			open_pack.$set(open_pack_changes);
    			const buy_pack_changes = {};

    			if (!updating_packCount && dirty & /*packCount*/ 1) {
    				updating_packCount = true;
    				buy_pack_changes.packCount = /*packCount*/ ctx[0];
    				add_flush_callback(() => updating_packCount = false);
    			}

    			buy_pack.$set(buy_pack_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(open_pack.$$.fragment, local);
    			transition_in(buy_pack.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(open_pack.$$.fragment, local);
    			transition_out(buy_pack.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(section1);
    			destroy_component(open_pack);
    			destroy_component(buy_pack);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Packs', slots, []);
    	let { packCount = 15 } = $$props;
    	let { page = "Packs" } = $$props;
    	const writable_props = ['packCount', 'page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Packs> was created with unknown prop '${key}'`);
    	});

    	function open_pack_page_binding(value) {
    		page = value;
    		$$invalidate(1, page);
    	}

    	function buy_pack_packCount_binding(value) {
    		packCount = value;
    		$$invalidate(0, packCount);
    	}

    	$$self.$$set = $$props => {
    		if ('packCount' in $$props) $$invalidate(0, packCount = $$props.packCount);
    		if ('page' in $$props) $$invalidate(1, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({ Buy_pack, Open_pack, packCount, page });

    	$$self.$inject_state = $$props => {
    		if ('packCount' in $$props) $$invalidate(0, packCount = $$props.packCount);
    		if ('page' in $$props) $$invalidate(1, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [packCount, page, open_pack_page_binding, buy_pack_packCount_binding];
    }

    class Packs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { packCount: 0, page: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Packs",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get packCount() {
    		throw new Error("<Packs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set packCount(value) {
    		throw new Error("<Packs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get page() {
    		throw new Error("<Packs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Packs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Nav.svelte generated by Svelte v3.44.1 */

    const file$4 = "src/Nav.svelte";

    // (28:10) {#if page == "Home"}
    function create_if_block_3$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "underline svelte-j79nbm");
    			add_location(div, file$4, 28, 12, 686);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(28:10) {#if page == \\\"Home\\\"}",
    		ctx
    	});

    	return block;
    }

    // (34:10) {#if page == "Packs"}
    function create_if_block_2$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "underline svelte-j79nbm");
    			add_location(div, file$4, 34, 12, 899);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(34:10) {#if page == \\\"Packs\\\"}",
    		ctx
    	});

    	return block;
    }

    // (40:10) {#if page == "MyProfile"}
    function create_if_block_1$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "underline svelte-j79nbm");
    			add_location(div, file$4, 40, 12, 1122);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(40:10) {#if page == \\\"MyProfile\\\"}",
    		ctx
    	});

    	return block;
    }

    // (46:10) {#if page == "Account"}
    function create_if_block$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "underline svelte-j79nbm");
    			add_location(div, file$4, 46, 12, 1343);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(46:10) {#if page == \\\"Account\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let head;
    	let link;
    	let t0;
    	let section;
    	let ul;
    	let li0;
    	let a0;
    	let t2;
    	let t3;
    	let li1;
    	let a1;
    	let t5;
    	let t6;
    	let li2;
    	let a2;
    	let t8;
    	let t9;
    	let li3;
    	let a3;
    	let t11;
    	let mounted;
    	let dispose;
    	let if_block0 = /*page*/ ctx[0] == "Home" && create_if_block_3$1(ctx);
    	let if_block1 = /*page*/ ctx[0] == "Packs" && create_if_block_2$1(ctx);
    	let if_block2 = /*page*/ ctx[0] == "MyProfile" && create_if_block_1$1(ctx);
    	let if_block3 = /*page*/ ctx[0] == "Account" && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			section = element("section");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "HOME";
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "PACKS";
    			t5 = space();
    			if (if_block1) if_block1.c();
    			t6 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "PROFILE";
    			t8 = space();
    			if (if_block2) if_block2.c();
    			t9 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "ACCOUNT";
    			t11 = space();
    			if (if_block3) if_block3.c();
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
    			attr_dev(link, "crossorigin", "anonymous");
    			add_location(link, file$4, 1, 4, 11);
    			add_location(head, file$4, 0, 0, 0);
    			attr_dev(a0, "class", "nav-link svelte-j79nbm");
    			attr_dev(a0, "id", "homelink");
    			add_location(a0, file$4, 26, 10, 577);
    			attr_dev(li0, "class", "nav-item");
    			add_location(li0, file$4, 25, 8, 545);
    			attr_dev(a1, "class", "nav-link svelte-j79nbm");
    			attr_dev(a1, "id", "packslink");
    			add_location(a1, file$4, 32, 10, 786);
    			attr_dev(li1, "class", "nav-item");
    			add_location(li1, file$4, 31, 8, 754);
    			attr_dev(a2, "class", "nav-link svelte-j79nbm");
    			attr_dev(a2, "id", "profilelink");
    			add_location(a2, file$4, 38, 10, 999);
    			attr_dev(li2, "class", "nav-item");
    			add_location(li2, file$4, 37, 8, 967);
    			attr_dev(a3, "class", "nav-link svelte-j79nbm");
    			attr_dev(a3, "id", "accountlink");
    			add_location(a3, file$4, 44, 10, 1222);
    			attr_dev(li3, "class", "nav-item");
    			add_location(li3, file$4, 43, 8, 1190);
    			attr_dev(ul, "class", "nav svelte-j79nbm");
    			add_location(ul, file$4, 24, 4, 520);
    			add_location(section, file$4, 23, 0, 506);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(li0, t2);
    			if (if_block0) if_block0.m(li0, null);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(li1, t5);
    			if (if_block1) if_block1.m(li1, null);
    			append_dev(ul, t6);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(li2, t8);
    			if (if_block2) if_block2.m(li2, null);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(li3, t11);
    			if (if_block3) if_block3.m(li3, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*setPageHome*/ ctx[1], false, false, false),
    					listen_dev(a1, "click", /*setPagePacks*/ ctx[2], false, false, false),
    					listen_dev(a2, "click", /*setPageProfile*/ ctx[3], false, false, false),
    					listen_dev(a3, "click", /*setPageAccount*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[0] == "Home") {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					if_block0.m(li0, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*page*/ ctx[0] == "Packs") {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_2$1(ctx);
    					if_block1.c();
    					if_block1.m(li1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*page*/ ctx[0] == "MyProfile") {
    				if (if_block2) ; else {
    					if_block2 = create_if_block_1$1(ctx);
    					if_block2.c();
    					if_block2.m(li2, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*page*/ ctx[0] == "Account") {
    				if (if_block3) ; else {
    					if_block3 = create_if_block$1(ctx);
    					if_block3.c();
    					if_block3.m(li3, null);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	let { page = "Home" } = $$props;

    	function setPageHome() {
    		$$invalidate(0, page = "Home");
    	}

    	function setPagePacks() {
    		$$invalidate(0, page = "Packs");
    	}

    	function setPageProfile() {
    		$$invalidate(0, page = "MyProfile");
    	}

    	function setPageAccount() {
    		$$invalidate(0, page = "Account");
    	}

    	const writable_props = ['page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		page,
    		setPageHome,
    		setPagePacks,
    		setPageProfile,
    		setPageAccount
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, setPageHome, setPagePacks, setPageProfile, setPageAccount];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get page() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Home.svelte generated by Svelte v3.44.1 */
    const file$3 = "src/Home.svelte";

    function create_fragment$3(ctx) {
    	let head;
    	let link;
    	let t0;
    	let div9;
    	let div2;
    	let h30;
    	let t2;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let div0;
    	let h50;
    	let t5;
    	let h60;
    	let t9;
    	let p0;
    	let t11;
    	let div5;
    	let h31;
    	let t13;
    	let div4;
    	let img1;
    	let img1_src_value;
    	let t14;
    	let div3;
    	let h51;
    	let t16;
    	let h61;
    	let t18;
    	let p1;
    	let t20;
    	let div8;
    	let h32;
    	let t22;
    	let div7;
    	let img2;
    	let img2_src_value;
    	let t23;
    	let div6;
    	let h52;
    	let t25;
    	let h62;
    	let t27;
    	let p2;

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			div9 = element("div");
    			div2 = element("div");
    			h30 = element("h3");
    			h30.textContent = "MATCHES";
    			t2 = space();
    			div1 = element("div");
    			img0 = element("img");
    			t3 = space();
    			div0 = element("div");
    			h50 = element("h5");
    			h50.textContent = `${/*name*/ ctx[1]}`;
    			t5 = space();
    			h60 = element("h6");
    			h60.textContent = `${/*star_sign*/ ctx[2]}  |  ${/*mbti*/ ctx[3]}`;
    			t9 = space();
    			p0 = element("p");
    			p0.textContent = `${/*bio*/ ctx[4]}`;
    			t11 = space();
    			div5 = element("div");
    			h31 = element("h3");
    			h31.textContent = "CRUSHES";
    			t13 = space();
    			div4 = element("div");
    			img1 = element("img");
    			t14 = space();
    			div3 = element("div");
    			h51 = element("h5");
    			h51.textContent = `${/*name*/ ctx[1]}`;
    			t16 = space();
    			h61 = element("h6");
    			h61.textContent = "Capricorn |  ABCD";
    			t18 = space();
    			p1 = element("p");
    			p1.textContent = `${/*bio*/ ctx[4]}`;
    			t20 = space();
    			div8 = element("div");
    			h32 = element("h3");
    			h32.textContent = "OPEN PACKS";
    			t22 = space();
    			div7 = element("div");
    			img2 = element("img");
    			t23 = space();
    			div6 = element("div");
    			h52 = element("h5");
    			h52.textContent = `${/*name*/ ctx[1]}`;
    			t25 = space();
    			h62 = element("h6");
    			h62.textContent = "Taurus |  ABCD";
    			t27 = space();
    			p2 = element("p");
    			p2.textContent = `${/*bio*/ ctx[4]}`;
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
    			attr_dev(link, "crossorigin", "anonymous");
    			add_location(link, file$3, 15, 4, 408);
    			add_location(head, file$3, 14, 0, 397);
    			attr_dev(h30, "class", "option svelte-14ba8b1");
    			add_location(h30, file$3, 23, 8, 705);
    			attr_dev(img0, "class", "profile-picture");
    			if (!src_url_equal(img0.src, img0_src_value = /*src*/ ctx[0])) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$3, 26, 12, 860);
    			attr_dev(h50, "class", "profile-name");
    			add_location(h50, file$3, 28, 16, 948);
    			attr_dev(h60, "class", "profile-type");
    			add_location(h60, file$3, 29, 16, 1001);
    			attr_dev(p0, "class", "profile-bio");
    			add_location(p0, file$3, 30, 16, 1070);
    			attr_dev(div0, "class", "card-body svelte-14ba8b1");
    			add_location(div0, file$3, 27, 12, 908);
    			attr_dev(div1, "class", "card");
    			set_style(div1, "width", "20rem");
    			add_location(div1, file$3, 24, 8, 747);
    			attr_dev(div2, "class", "card-holder svelte-14ba8b1");
    			add_location(div2, file$3, 22, 4, 671);
    			attr_dev(h31, "class", "option svelte-14ba8b1");
    			add_location(h31, file$3, 36, 8, 1188);
    			attr_dev(img1, "class", "profile-picture");
    			if (!src_url_equal(img1.src, img1_src_value = /*src*/ ctx[0])) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$3, 39, 12, 1345);
    			attr_dev(h51, "class", "profile-name");
    			add_location(h51, file$3, 41, 16, 1433);
    			attr_dev(h61, "class", "profile-type");
    			add_location(h61, file$3, 42, 16, 1486);
    			attr_dev(p1, "class", "profile-bio");
    			add_location(p1, file$3, 43, 16, 1550);
    			attr_dev(div3, "class", "card-body svelte-14ba8b1");
    			add_location(div3, file$3, 40, 12, 1393);
    			attr_dev(div4, "class", "card");
    			set_style(div4, "width", "20rem");
    			add_location(div4, file$3, 37, 8, 1230);
    			attr_dev(div5, "class", "card-holder svelte-14ba8b1");
    			add_location(div5, file$3, 35, 4, 1154);
    			attr_dev(h32, "class", "option svelte-14ba8b1");
    			add_location(h32, file$3, 49, 8, 1667);
    			attr_dev(img2, "class", "profile-picture");
    			if (!src_url_equal(img2.src, img2_src_value = /*src*/ ctx[0])) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$3, 52, 12, 1827);
    			attr_dev(h52, "class", "profile-name");
    			add_location(h52, file$3, 54, 16, 1915);
    			attr_dev(h62, "class", "profile-type");
    			add_location(h62, file$3, 55, 16, 1968);
    			attr_dev(p2, "class", "profile-bio");
    			add_location(p2, file$3, 56, 16, 2029);
    			attr_dev(div6, "class", "card-body svelte-14ba8b1");
    			add_location(div6, file$3, 53, 12, 1875);
    			attr_dev(div7, "class", "card");
    			set_style(div7, "width", "20rem");
    			add_location(div7, file$3, 50, 8, 1712);
    			attr_dev(div8, "class", "card-holder svelte-14ba8b1");
    			add_location(div8, file$3, 48, 4, 1633);
    			attr_dev(div9, "class", "container");
    			add_location(div9, file$3, 21, 0, 643);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div2);
    			append_dev(div2, h30);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, h50);
    			append_dev(div0, t5);
    			append_dev(div0, h60);
    			append_dev(div0, t9);
    			append_dev(div0, p0);
    			append_dev(div9, t11);
    			append_dev(div9, div5);
    			append_dev(div5, h31);
    			append_dev(div5, t13);
    			append_dev(div5, div4);
    			append_dev(div4, img1);
    			append_dev(div4, t14);
    			append_dev(div4, div3);
    			append_dev(div3, h51);
    			append_dev(div3, t16);
    			append_dev(div3, h61);
    			append_dev(div3, t18);
    			append_dev(div3, p1);
    			append_dev(div9, t20);
    			append_dev(div9, div8);
    			append_dev(div8, h32);
    			append_dev(div8, t22);
    			append_dev(div8, div7);
    			append_dev(div7, img2);
    			append_dev(div7, t23);
    			append_dev(div7, div6);
    			append_dev(div6, h52);
    			append_dev(div6, t25);
    			append_dev(div6, h62);
    			append_dev(div6, t27);
    			append_dev(div6, p2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let src = "images/corgi.jpg";
    	let name = "Random Random Corgi!";
    	let star_sign = "Sagittarius";
    	let mbti = "INFP";
    	let bio = "I like food, dogs, and naps! More words go here.. and here.. words, words, words, blah!";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		dataset_dev,
    		App,
    		BuyPack: Buy_pack,
    		Nav,
    		src,
    		name,
    		star_sign,
    		mbti,
    		bio
    	});

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('star_sign' in $$props) $$invalidate(2, star_sign = $$props.star_sign);
    		if ('mbti' in $$props) $$invalidate(3, mbti = $$props.mbti);
    		if ('bio' in $$props) $$invalidate(4, bio = $$props.bio);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, name, star_sign, mbti, bio];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/MyProfile.svelte generated by Svelte v3.44.1 */

    const file$2 = "src/MyProfile.svelte";

    function create_fragment$2(ctx) {
    	let head;
    	let link;
    	let t0;
    	let section;
    	let div15;
    	let div14;
    	let div4;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t1;
    	let div3;
    	let br0;
    	let t2;
    	let div2;
    	let button;
    	let svg;
    	let path;
    	let t3;
    	let ul;
    	let li0;
    	let a0;
    	let t5;
    	let li1;
    	let a1;
    	let t7;
    	let p0;
    	let t8;
    	let t9;
    	let t10;
    	let p1;
    	let t11;
    	let t12;
    	let t13;
    	let p2;
    	let t14;
    	let t15;
    	let t16;
    	let p3;
    	let t17;
    	let t18;
    	let div6;
    	let br1;
    	let t19;
    	let p4;
    	let t21;
    	let div5;
    	let t22;
    	let div7;
    	let p5;
    	let t23;
    	let t24;
    	let div13;
    	let div9;
    	let t25;
    	let div8;
    	let t27;
    	let div10;
    	let t29;
    	let div11;
    	let t31;
    	let div12;

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			section = element("section");
    			div15 = element("div");
    			div14 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t1 = space();
    			div3 = element("div");
    			br0 = element("br");
    			t2 = space();
    			div2 = element("div");
    			button = element("button");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Edit Profile";
    			t5 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Take Personality Test";
    			t7 = space();
    			p0 = element("p");
    			t8 = text("Name: ");
    			t9 = text(/*name*/ ctx[1]);
    			t10 = space();
    			p1 = element("p");
    			t11 = text("MBTI: ");
    			t12 = text(/*MBTI*/ ctx[2]);
    			t13 = space();
    			p2 = element("p");
    			t14 = text("Star Sign: ");
    			t15 = text(/*starSign*/ ctx[3]);
    			t16 = space();
    			p3 = element("p");
    			t17 = text(/*profileDescription*/ ctx[4]);
    			t18 = space();
    			div6 = element("div");
    			br1 = element("br");
    			t19 = space();
    			p4 = element("p");
    			p4.textContent = "Daily Horoscope";
    			t21 = space();
    			div5 = element("div");
    			t22 = space();
    			div7 = element("div");
    			p5 = element("p");
    			t23 = text(/*horoscope*/ ctx[0]);
    			t24 = space();
    			div13 = element("div");
    			div9 = element("div");
    			t25 = text("Daily Love Compatibility\n                    ");
    			div8 = element("div");
    			div8.textContent = "Taurus";
    			t27 = space();
    			div10 = element("div");
    			div10.textContent = "Mood of the Day";
    			t29 = space();
    			div11 = element("div");
    			div11.textContent = "Lucky Number";
    			t31 = space();
    			div12 = element("div");
    			div12.textContent = "Lucky Color";
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
    			attr_dev(link, "crossorigin", "anonymous");
    			add_location(link, file$2, 1, 4, 11);
    			add_location(head, file$2, 0, 0, 0);
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[5])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "resize svelte-tzrhri");
    			attr_dev(img, "alt", "Profile Picture is displayed here");
    			add_location(img, file$2, 24, 24, 935);
    			attr_dev(div0, "class", "center svelte-tzrhri");
    			add_location(div0, file$2, 23, 20, 889);
    			attr_dev(div1, "class", "col svelte-tzrhri");
    			add_location(div1, file$2, 21, 16, 785);
    			add_location(br0, file$2, 28, 20, 1109);
    			attr_dev(path, "d", "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z");
    			add_location(path, file$2, 32, 32, 1552);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "16");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "class", "bi bi-three-dots-vertical");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file$2, 31, 28, 1382);
    			attr_dev(button, "class", "btn btn-secondary rounded svelte-tzrhri");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "id", "dropdownMenuButton1");
    			attr_dev(button, "data-bs-toggle", "dropdown");
    			attr_dev(button, "aria-expanded", "false");
    			add_location(button, file$2, 30, 24, 1224);
    			attr_dev(a0, "class", "dropdown-item");
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$2, 36, 28, 1877);
    			add_location(li0, file$2, 36, 24, 1873);
    			attr_dev(a1, "class", "dropdown-item");
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$2, 37, 28, 1961);
    			add_location(li1, file$2, 37, 24, 1957);
    			attr_dev(ul, "class", "dropdown-menu");
    			attr_dev(ul, "aria-labelledby", "dropdownMenuButton1");
    			add_location(ul, file$2, 35, 24, 1784);
    			attr_dev(div2, "class", "dropdown d-flex align-items-end justify-content-end");
    			add_location(div2, file$2, 29, 20, 1134);
    			attr_dev(p0, "class", "svelte-tzrhri");
    			add_location(p0, file$2, 40, 20, 2103);
    			attr_dev(p1, "class", "svelte-tzrhri");
    			add_location(p1, file$2, 41, 20, 2145);
    			attr_dev(p2, "class", "svelte-tzrhri");
    			add_location(p2, file$2, 42, 20, 2187);
    			attr_dev(p3, "class", "svelte-tzrhri");
    			add_location(p3, file$2, 43, 20, 2238);
    			attr_dev(div3, "class", "col-8");
    			add_location(div3, file$2, 27, 16, 1069);
    			attr_dev(div4, "class", "row svelte-tzrhri");
    			add_location(div4, file$2, 20, 12, 751);
    			add_location(br1, file$2, 48, 16, 2394);
    			attr_dev(p4, "class", "svelte-tzrhri");
    			add_location(p4, file$2, 49, 16, 2415);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$2, 50, 16, 2456);
    			attr_dev(div6, "class", "row horoscope-wrapper svelte-tzrhri");
    			add_location(div6, file$2, 47, 12, 2342);
    			attr_dev(p5, "class", "svelte-tzrhri");
    			add_location(p5, file$2, 55, 16, 2614);
    			attr_dev(div7, "class", "row horoscope-text horoscope svelte-tzrhri");
    			add_location(div7, file$2, 54, 12, 2555);
    			add_location(div8, file$2, 60, 20, 2804);
    			attr_dev(div9, "class", "col svelte-tzrhri");
    			add_location(div9, file$2, 58, 16, 2725);
    			attr_dev(div10, "class", "col svelte-tzrhri");
    			add_location(div10, file$2, 64, 16, 2907);
    			attr_dev(div11, "class", "col svelte-tzrhri");
    			add_location(div11, file$2, 67, 16, 2996);
    			attr_dev(div12, "class", "col svelte-tzrhri");
    			add_location(div12, file$2, 70, 16, 3082);
    			attr_dev(div13, "class", "row horoscope horoscope-bottom svelte-tzrhri");
    			add_location(div13, file$2, 57, 12, 2664);
    			attr_dev(div14, "class", "container");
    			add_location(div14, file$2, 19, 8, 715);
    			attr_dev(div15, "class", "big-box svelte-tzrhri");
    			add_location(div15, file$2, 18, 4, 685);
    			add_location(section, file$2, 17, 0, 671);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div15);
    			append_dev(div15, div14);
    			append_dev(div14, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, br0);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, button);
    			append_dev(button, svg);
    			append_dev(svg, path);
    			append_dev(div2, t3);
    			append_dev(div2, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(div3, t7);
    			append_dev(div3, p0);
    			append_dev(p0, t8);
    			append_dev(p0, t9);
    			append_dev(div3, t10);
    			append_dev(div3, p1);
    			append_dev(p1, t11);
    			append_dev(p1, t12);
    			append_dev(div3, t13);
    			append_dev(div3, p2);
    			append_dev(p2, t14);
    			append_dev(p2, t15);
    			append_dev(div3, t16);
    			append_dev(div3, p3);
    			append_dev(p3, t17);
    			append_dev(div14, t18);
    			append_dev(div14, div6);
    			append_dev(div6, br1);
    			append_dev(div6, t19);
    			append_dev(div6, p4);
    			append_dev(div6, t21);
    			append_dev(div6, div5);
    			append_dev(div14, t22);
    			append_dev(div14, div7);
    			append_dev(div7, p5);
    			append_dev(p5, t23);
    			append_dev(div14, t24);
    			append_dev(div14, div13);
    			append_dev(div13, div9);
    			append_dev(div9, t25);
    			append_dev(div9, div8);
    			append_dev(div13, t27);
    			append_dev(div13, div10);
    			append_dev(div13, t29);
    			append_dev(div13, div11);
    			append_dev(div13, t31);
    			append_dev(div13, div12);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 2) set_data_dev(t9, /*name*/ ctx[1]);
    			if (dirty & /*MBTI*/ 4) set_data_dev(t12, /*MBTI*/ ctx[2]);
    			if (dirty & /*starSign*/ 8) set_data_dev(t15, /*starSign*/ ctx[3]);
    			if (dirty & /*profileDescription*/ 16) set_data_dev(t17, /*profileDescription*/ ctx[4]);
    			if (dirty & /*horoscope*/ 1) set_data_dev(t23, /*horoscope*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MyProfile', slots, []);
    	let src = "images/default_profile_pics/kanye-west.png";
    	let { horoscope = "This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject." } = $$props;
    	let { name = "Kanye" } = $$props;
    	let { MBTI = "ENTP" } = $$props;
    	let { starSign = "Taurus" } = $$props;
    	let { profileDescription = "This is my cute profile description." } = $$props;
    	const writable_props = ['horoscope', 'name', 'MBTI', 'starSign', 'profileDescription'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MyProfile> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('horoscope' in $$props) $$invalidate(0, horoscope = $$props.horoscope);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('MBTI' in $$props) $$invalidate(2, MBTI = $$props.MBTI);
    		if ('starSign' in $$props) $$invalidate(3, starSign = $$props.starSign);
    		if ('profileDescription' in $$props) $$invalidate(4, profileDescription = $$props.profileDescription);
    	};

    	$$self.$capture_state = () => ({
    		src,
    		horoscope,
    		name,
    		MBTI,
    		starSign,
    		profileDescription
    	});

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(5, src = $$props.src);
    		if ('horoscope' in $$props) $$invalidate(0, horoscope = $$props.horoscope);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('MBTI' in $$props) $$invalidate(2, MBTI = $$props.MBTI);
    		if ('starSign' in $$props) $$invalidate(3, starSign = $$props.starSign);
    		if ('profileDescription' in $$props) $$invalidate(4, profileDescription = $$props.profileDescription);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [horoscope, name, MBTI, starSign, profileDescription, src];
    }

    class MyProfile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			horoscope: 0,
    			name: 1,
    			MBTI: 2,
    			starSign: 3,
    			profileDescription: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MyProfile",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get horoscope() {
    		throw new Error("<MyProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set horoscope(value) {
    		throw new Error("<MyProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<MyProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<MyProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MBTI() {
    		throw new Error("<MyProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MBTI(value) {
    		throw new Error("<MyProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get starSign() {
    		throw new Error("<MyProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set starSign(value) {
    		throw new Error("<MyProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get profileDescription() {
    		throw new Error("<MyProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set profileDescription(value) {
    		throw new Error("<MyProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/OpennedPackPage.svelte generated by Svelte v3.44.1 */

    const { console: console_1$1 } = globals;
    const file$1 = "src/OpennedPackPage.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	child_ctx[22] = i;
    	return child_ctx;
    }

    // (191:16) {#each list as person, i}
    function create_each_block(ctx) {
    	let div2;
    	let div0;
    	let card;
    	let t0;
    	let div1;
    	let button;
    	let t2;
    	let current;

    	card = new Card({
    			props: {
    				AstroPic: /*person*/ ctx[20].astropic,
    				Picture: /*person*/ ctx[20].picture,
    				PersonalityPic: /*person*/ ctx[20].personalitypic,
    				Name: /*person*/ ctx[20].name,
    				Astro: /*person*/ ctx[20].astro,
    				Personality: /*person*/ ctx[20].mbti,
    				Age: /*person*/ ctx[20].age,
    				Gender: /*person*/ ctx[20].gender,
    				Bio: /*person*/ ctx[20].bio
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(card.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			button = element("button");
    			button.textContent = "Match!";
    			t2 = space();
    			attr_dev(div0, "class", "card svelte-q74les");
    			add_location(div0, file$1, 193, 24, 10051);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-outline-dark svelte-q74les");
    			add_location(button, file$1, 209, 25, 10940);
    			add_location(div1, file$1, 209, 20, 10935);
    			attr_dev(div2, "class", "card-butt svelte-q74les");
    			add_location(div2, file$1, 191, 16, 9953);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(card, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, button);
    			append_dev(div2, t2);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};
    			if (dirty & /*list*/ 1) card_changes.AstroPic = /*person*/ ctx[20].astropic;
    			if (dirty & /*list*/ 1) card_changes.Picture = /*person*/ ctx[20].picture;
    			if (dirty & /*list*/ 1) card_changes.PersonalityPic = /*person*/ ctx[20].personalitypic;
    			if (dirty & /*list*/ 1) card_changes.Name = /*person*/ ctx[20].name;
    			if (dirty & /*list*/ 1) card_changes.Astro = /*person*/ ctx[20].astro;
    			if (dirty & /*list*/ 1) card_changes.Personality = /*person*/ ctx[20].mbti;
    			if (dirty & /*list*/ 1) card_changes.Age = /*person*/ ctx[20].age;
    			if (dirty & /*list*/ 1) card_changes.Gender = /*person*/ ctx[20].gender;
    			if (dirty & /*list*/ 1) card_changes.Bio = /*person*/ ctx[20].bio;
    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(card);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(191:16) {#each list as person, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let head;
    	let link;
    	let t0;
    	let button;
    	let t2;
    	let center;
    	let div1;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*list*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			button = element("button");
    			button.textContent = "Open New Pack";
    			t2 = space();
    			center = element("center");
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
    			attr_dev(link, "crossorigin", "anonymous");
    			add_location(link, file$1, 181, 4, 9488);
    			add_location(head, file$1, 180, 0, 9477);
    			attr_dev(button, "class", "btn btn-outline-dark svelte-q74les");
    			add_location(button, file$1, 186, 4, 9726);
    			attr_dev(div0, "class", "cards-scroll svelte-q74les");
    			add_location(div0, file$1, 189, 12, 9868);
    			attr_dev(div1, "class", "container-fluid");
    			add_location(div1, file$1, 188, 8, 9826);
    			add_location(center, file$1, 187, 4, 9809);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, center, anchor);
    			append_dev(center, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*getList*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*list*/ 1) {
    				each_value = /*list*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(center);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OpennedPackPage', slots, []);
    	let aquariusLink = 'images/signs/aquarius.png';
    	let ariesLink = 'images/signs/aries.png';
    	let cancerLink = 'images/signs/cancer.png';
    	let capricornLink = 'images/signs/capricorn.png';
    	let geminiLink = 'images/signs/gemini.png';
    	let leoLink = 'images/signs/leo.png';
    	let libraLink = 'images/signs/libra.png';
    	let piscesLink = 'images/signs/pisces.png';
    	let sagittariusLink = 'images/signs/sagittarius.png';
    	let scorpioLink = 'images/signs/scorpio.png';
    	let taurusLink = 'images/signs/taurus.png';
    	let virgoLink = 'images/signs/virgo.png';
    	let cardBackShowing = false;
    	let selected;
    	let list = [];
    	let pics = [];

    	const toggleBackFront = e => {
    		// if same card clicked twice to toggle front and back
    		if (selected === Number(e.target.dataset.cardId)) {
    			selected = null;
    			cardBackShowing = !cardBackShowing;
    		} else {
    			cardBackShowing = !cardBackShowing;
    			selected = Number(e.target.dataset.cardId);
    		}
    	};

    	function getList() {
    		fetch("http://127.0.0.1:5005/list").then(d => d.json()).then(d => {
    			$$invalidate(0, list = d);
    			$$invalidate(0, list = list.slice(0, 7));

    			for (let person in list) {
    				if (person['astro'] == 'gemini') {
    					console.log("HI");
    					person['astropic'] = geminiLink;
    				}

    				if (person['astro'] == 'virgo') {
    					person['astropic'] = virgoLink;
    				}
    			}

    			return list;
    		}).then(d => console.log(d));
    	}

    	function getPics() {
    		fetch("http://127.0.0.1:5005/getPic").then(d => d.json()).then(d => {
    			$$invalidate(0, list = d);
    			$$invalidate(0, list = list.slice(0, 7));
    			return list;
    		}).then(d => console.log(d));
    	}

    	const People = [
    		{
    			picture: 'images/default_profile_pics/kanye-west.png',
    			astropic: 'images/signs/gemini.png',
    			personalitypic: 'images/mbti_pics/isfp.png',
    			name: 'Kanye West',
    			astro: 'Gemini',
    			mbti: 'ISFP',
    			age: 30,
    			gender: 'Male',
    			bio: 'Best there ever was. I made Taylor famous. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		},
    		{
    			picture: 'images/default_profile_pics/kim-kardashian.png',
    			astropic: 'images/signs/pisces.png',
    			personalitypic: 'images/mbti_pics/intj.png',
    			name: 'Kim Kardashian',
    			astro: 'Pisces',
    			mbti: 'INTJ',
    			age: 32,
    			gender: "Female",
    			bio: 'I love my children, especially Chicago. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		},
    		{
    			picture: 'images/default_profile_pics/doja-cat.png',
    			astropic: 'images/signs/leo.png',
    			personalitypic: 'images/mbti_pics/enfj.png',
    			name: 'Doja Cat',
    			astro: 'Leo',
    			mbti: 'ENFP',
    			age: 24,
    			gender: 'Female',
    			bio: 'Catch all my popular music on Tiktok. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		},
    		{
    			picture: 'images/default_profile_pics/awkwafina.png',
    			astropic: 'images/signs/cancer.png',
    			personalitypic: 'images/mbti_pics/esfp.png',
    			name: 'Awkwafina',
    			astro: 'Cancer',
    			mbti: 'ESFP',
    			age: 27,
    			gender: 'Female',
    			bio: 'Did you know that Awkwafina isn\'t my real name? \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		},
    		{
    			picture: 'images/default_profile_pics/chris-pine.png',
    			astropic: 'images/signs/aries.png',
    			personalitypic: 'images/mbti_pics/estp.png',
    			name: 'Chris Pine',
    			astro: 'Aries',
    			mbti: 'ESTP',
    			age: 36,
    			gender: 'Male',
    			bio: 'I\'m the hottest Chris. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		},
    		{
    			picture: 'images/default_profile_pics/danny-devito.png',
    			astropic: 'images/signs/sagittarius.png',
    			personalitypic: 'images/mbti_pics/esfj.png',
    			name: 'Danny Devito',
    			astro: 'Sagittarius',
    			mbti: 'ESFJ',
    			age: '88',
    			gender: 'Male',
    			bio: 'Can I offer you an egg in this trying time?, \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		},
    		{
    			picture: 'images/default_profile_pics/margot-robbie.png',
    			astropic: 'images/signs/libra.png',
    			personalitypic: 'images/mbti_pics/entp.png',
    			name: 'Margot Robie',
    			astro: 'Libra',
    			mbti: 'ENTP',
    			age: 33,
    			gender: 'Female',
    			bio: 'You probably know me Suicide Squad, \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<OpennedPackPage> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Card,
    		Cardback,
    		aquariusLink,
    		ariesLink,
    		cancerLink,
    		capricornLink,
    		geminiLink,
    		leoLink,
    		libraLink,
    		piscesLink,
    		sagittariusLink,
    		scorpioLink,
    		taurusLink,
    		virgoLink,
    		cardBackShowing,
    		selected,
    		list,
    		pics,
    		toggleBackFront,
    		getList,
    		getPics,
    		People
    	});

    	$$self.$inject_state = $$props => {
    		if ('aquariusLink' in $$props) aquariusLink = $$props.aquariusLink;
    		if ('ariesLink' in $$props) ariesLink = $$props.ariesLink;
    		if ('cancerLink' in $$props) cancerLink = $$props.cancerLink;
    		if ('capricornLink' in $$props) capricornLink = $$props.capricornLink;
    		if ('geminiLink' in $$props) geminiLink = $$props.geminiLink;
    		if ('leoLink' in $$props) leoLink = $$props.leoLink;
    		if ('libraLink' in $$props) libraLink = $$props.libraLink;
    		if ('piscesLink' in $$props) piscesLink = $$props.piscesLink;
    		if ('sagittariusLink' in $$props) sagittariusLink = $$props.sagittariusLink;
    		if ('scorpioLink' in $$props) scorpioLink = $$props.scorpioLink;
    		if ('taurusLink' in $$props) taurusLink = $$props.taurusLink;
    		if ('virgoLink' in $$props) virgoLink = $$props.virgoLink;
    		if ('cardBackShowing' in $$props) cardBackShowing = $$props.cardBackShowing;
    		if ('selected' in $$props) selected = $$props.selected;
    		if ('list' in $$props) $$invalidate(0, list = $$props.list);
    		if ('pics' in $$props) pics = $$props.pics;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [list, getList];
    }

    class OpennedPackPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OpennedPackPage",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/routes/App.svelte generated by Svelte v3.44.1 */

    const { console: console_1 } = globals;
    const file = "src/routes/App.svelte";

    // (49:0) {:else}
    function create_else_block(ctx) {
    	let section;

    	const block = {
    		c: function create() {
    			section = element("section");
    			section.textContent = "404: Oops! This page doesn't exist.";
    			add_location(section, file, 49, 0, 1054);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(49:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:28) 
    function create_if_block_3(ctx) {
    	let section;
    	let opennedpackpage;
    	let current;
    	opennedpackpage = new OpennedPackPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(opennedpackpage.$$.fragment);
    			add_location(section, file, 45, 0, 1005);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(opennedpackpage, section, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(opennedpackpage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(opennedpackpage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(opennedpackpage);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(45:28) ",
    		ctx
    	});

    	return block;
    }

    // (41:28) 
    function create_if_block_2(ctx) {
    	let section;
    	let myprofile;
    	let current;
    	myprofile = new MyProfile({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(myprofile.$$.fragment);
    			add_location(section, file, 41, 0, 941);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(myprofile, section, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(myprofile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(myprofile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(myprofile);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(41:28) ",
    		ctx
    	});

    	return block;
    }

    // (37:24) 
    function create_if_block_1(ctx) {
    	let section;
    	let packs;
    	let updating_page;
    	let current;

    	function packs_page_binding(value) {
    		/*packs_page_binding*/ ctx[2](value);
    	}

    	let packs_props = {};

    	if (/*page*/ ctx[0] !== void 0) {
    		packs_props.page = /*page*/ ctx[0];
    	}

    	packs = new Packs({ props: packs_props, $$inline: true });
    	binding_callbacks.push(() => bind(packs, 'page', packs_page_binding));

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(packs.$$.fragment);
    			add_location(section, file, 37, 0, 864);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(packs, section, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const packs_changes = {};

    			if (!updating_page && dirty & /*page*/ 1) {
    				updating_page = true;
    				packs_changes.page = /*page*/ ctx[0];
    				add_flush_callback(() => updating_page = false);
    			}

    			packs.$set(packs_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(packs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(packs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(packs);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(37:24) ",
    		ctx
    	});

    	return block;
    }

    // (33:0) {#if page=="Home"}
    function create_if_block(ctx) {
    	let section;
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(home.$$.fragment);
    			add_location(section, file, 33, 0, 808);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(home, section, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(home);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(33:0) {#if page==\\\"Home\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let head;
    	let link;
    	let t0;
    	let nav;
    	let updating_page;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	function nav_page_binding(value) {
    		/*nav_page_binding*/ ctx[1](value);
    	}

    	let nav_props = {};

    	if (/*page*/ ctx[0] !== void 0) {
    		nav_props.page = /*page*/ ctx[0];
    	}

    	nav = new Nav({ props: nav_props, $$inline: true });
    	binding_callbacks.push(() => bind(nav, 'page', nav_page_binding));

    	const if_block_creators = [
    		create_if_block,
    		create_if_block_1,
    		create_if_block_2,
    		create_if_block_3,
    		create_else_block
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*page*/ ctx[0] == "Home") return 0;
    		if (/*page*/ ctx[0] == "Packs") return 1;
    		if (/*page*/ ctx[0] == "MyProfile") return 2;
    		if (/*page*/ ctx[0] == "OpenPacks") return 3;
    		return 4;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			create_component(nav.$$.fragment);
    			t1 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
    			attr_dev(link, "crossorigin", "anonymous");
    			add_location(link, file, 1, 4, 11);
    			add_location(head, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			mount_component(nav, target, anchor);
    			insert_dev(target, t1, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const nav_changes = {};

    			if (!updating_page && dirty & /*page*/ 1) {
    				updating_page = true;
    				nav_changes.page = /*page*/ ctx[0];
    				add_flush_callback(() => updating_page = false);
    			}

    			nav.$set(nav_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t1);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getList() {
    	fetch("http://127.0.0.1:5005/list").then(d => console.log(d));
    } //.then(d => d.text())
    //.then(d => (list = d));

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let rand = -1;
    	let list;
    	let { page = "Home" } = $$props;
    	const writable_props = ['page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function nav_page_binding(value) {
    		page = value;
    		$$invalidate(0, page);
    	}

    	function packs_page_binding(value) {
    		page = value;
    		$$invalidate(0, page);
    	}

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		Cardback,
    		Card,
    		Packs,
    		Nav,
    		Home,
    		MyProfile,
    		OpennedPackPage,
    		rand,
    		list,
    		page,
    		getList
    	});

    	$$self.$inject_state = $$props => {
    		if ('rand' in $$props) rand = $$props.rand;
    		if ('list' in $$props) list = $$props.list;
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, nav_page_binding, packs_page_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get page() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
