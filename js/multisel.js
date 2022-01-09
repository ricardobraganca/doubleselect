class Multisel extends HTMLElement {

    constructor(){
        super();
        this.sel_source = this.create_select();
        this.sel_source.addEventListener('dblclick', this.onAddItem);
        this.sel_source.addEventListener('keyup', this.onEnterSel);

        this.sel_target = this.create_select();
        this.sel_target.addEventListener('dblclick', this.onRemoveItem);
        this.sel_target.addEventListener('keyup', this.onEnterRemoveSel);

        this.btn_add_all = this.create_button('»', this.onAddAllItens);
        this.btn_add = this.create_button('›', this.onAddItem);
        this.btn_rem = this.create_button('‹', this.onRemoveItem);
        this.btn_rem_all = this.create_button('«', this.onRemoveAllItens);
        this.btn_up = this.create_button('˄',this.onUp);
        this.btn_down = this.create_button('˅', this.onDown);
        this.span_btn_change = this.create_span('btn-change');
        this.span_btn_up_down = this.create_span('btn-up-down');

        this.txt_search = this.create_input();
        this.txt_search.addEventListener('keyup', this.onEnterText);

        this.div_txt_search = this.create_div('div-txt-search')

        this.div_txt_search.append(this.txt_search);
        this.div_txt_search.append(this.sel_source);

        this.load_sel_source();

        this.append(this.div_txt_search);

        this.span_btn_change.append(this.btn_add_all);
        this.span_btn_change.append(this.btn_add);
        this.span_btn_change.append(this.btn_rem);
        this.span_btn_change.append(this.btn_rem_all);

        this.append(this.span_btn_change);
        
        this.append(this.sel_target);

        this.span_btn_up_down.append(this.btn_up);
        this.span_btn_up_down.append(this.btn_down);
        this.append(this.span_btn_up_down);

    }

    connectedCallback(){

        this.sel_target.name = this.getAttribute('name');
        this.sel_target.id = this.getAttribute('name') + '-target-sel';
        this.sel_source.id = this.getAttribute('name') + '-source-sel';
        this.sel_target.classList.add('target-sel');
        this.sel_source.classList.add('source-sel');

        if(this.getAttribute('placeholder')){

            this.txt_search.placeholder = this.getAttribute('placeholder');
        }

        this.txt_search.tabIndex = 1;
        this.sel_source.tabIndex = 2;
        this.sel_target.tabIndex = 3;

    }

    load_sel_source(){

        this.sel_source.innerHTML = this.innerHTML;
        this.innerHTML = '';

        let cont = this.sel_source.options.length -1;

        for(let i=cont; i>=0; i--){

            if(this.sel_source.options[i].getAttribute('selected')){

                this.sel_target.add(this.sel_source.options[i]);
            }else{

                this.sel_source.options[i].setAttribute('selected','true');
                this.sel_source.options[i].selected=false;
            }   
        }
        
    }

    //COMPONENTES
    create_button(label, event){

        let btn = document.createElement('button');
        btn.innerHTML = label;
        btn.style.margin = '3px';
        btn.addEventListener('click',event);

        return btn;
    }

    create_select(){

        let sel = document.createElement('select');
        sel.setAttribute('multiple','multiple');
        sel.size=this.getAttribute('lines');
        
        return sel;
    }

    create_input(){

        let input = document.createElement('input');
        input.type='text';
        input.classList.add('txt-search');

        return input;
    }

    create_span(class_name){

        let spans = document.createElement('span');
        spans.classList.add(class_name);

        return spans;
    }

    create_div(class_name){

        let div = document.createElement('div');
        div.classList.add(class_name);

        return div;
    }    

    //EVENTOS
    onAddItem = ()=>{

        let count = this.sel_source.options.length -1;
        for(let i=count; i>=0; i--){

            if(this.sel_source.options[i].selected){

                this.sel_target.appendChild(this.sel_source.options[i]);
            }
        }
    }

    onAddAllItens = ()=>{

        let count = this.sel_source.options.length -1;
        for(let i=count; i>=0; i--){

            this.sel_source.options[i].style.display = 'block';
            this.sel_target.appendChild(this.sel_source.options[i]);
        }
    }

    onRemoveItem = ()=>{

        let count;

        count = this.sel_target.options.length -1;

        for(let i=count; i>=0; i--){

            if(this.sel_target.options[i].selected){

                this.sel_source.appendChild(this.sel_target.options[i]);
            }
        }
    }

    onRemoveAllItens = ()=>{

        let count = this.sel_target.options.length -1;
        for(let i=count; i>=0; i--){

            this.sel_source.appendChild(this.sel_target.options[i]);
        }
    }

    onUp = ()=>{

        let elem_up = this.sel_target.options[this.sel_target.selectedIndex -1];
        let elem = this.sel_target.options[this.sel_target.selectedIndex];

        if(elem_up){

            this.sel_target.insertBefore(elem, elem_up);
        }
    }

    onDown = ()=>{

        let elem_down = this.sel_target.options[this.sel_target.selectedIndex +2];
        let elem = this.sel_target.options[this.sel_target.selectedIndex];

        this.sel_target.insertBefore(elem, elem_down);
    }

    onEnterText = (evt)=>{

        let count = this.sel_source.options.length -1;

        if(evt.keyCode === 13){

            this.onAddItem();
        }else{

            for(let i=count; i>=0; i--){
    
                if(this.sel_source.options[i] && this.sel_source.options[i].text.includes(this.txt_search.value)){
    
                    this.sel_source.options[i].selected=true;
                    this.sel_source.options[i].style.display = "block";
                }else{
                    this.sel_source.options[i].selected=false;
                    this.sel_source.options[i].style.display = "none";
                }
            }
        }
    }

    onEnterSel = (evt)=>{

        if(evt.keyCode === 13){

            this.onAddItem();
        }
    }

    onEnterRemoveSel = (evt)=>{

        if(evt.keyCode === 13){

            this.onRemoveItem();
        }
    }

    //MÉTODOS
    add_option(value, label){

        let opt = document.createElement('option');
        opt.value = value;
        opt.text = label;
        this.sel_source.add(opt);
        return opt;
    }

    get_source_select(){

        return this.sel_source;
    }

    get_target_select(){

        return this.sel_target;
    }

}

customElements.define('rc-multisel', Multisel);