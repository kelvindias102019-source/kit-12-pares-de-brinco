  if(typeof window.fbq==='function') window.fbq('track', 'ViewContent', {
    content_name: 'Kit 12 Pares de Brincos Pontos de Luz Femininos com Zircônia Vários Tamanhos',
    content_type: 'product',
    content_ids: ['kit-12-pares-ponto-luz'],
    currency: 'BRL',
    value: 7.90
  });
  

    const metaMoneyValue=(qty,variant=null)=>{
      const safeQty=Math.max(1,Math.min(3,Number(qty)||1));
      return ({1:7.90,2:17.80,3:26.70})[safeQty];
    };
    const makeMetaEventId=(name)=>`${name}_${Date.now()}_${Math.random().toString(36).slice(2,10)}`;
    const getCookieValue=(name)=>{
      const parts=document.cookie ? document.cookie.split('; ') : [];
      const prefix=name+'=';
      const found=parts.find(part=>part.startsWith(prefix));
      return found ? decodeURIComponent(found.slice(prefix.length)) : null;
    };
    const metaCapiSend=(eventName,eventId,customData={})=>{
      if(location.protocol!=='http:' && location.protocol!=='https:') return;
      fetch('meta-capi.php',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'same-origin',
        keepalive:true,
        body:JSON.stringify({
          event_name:eventName,
          event_id:eventId,
          event_source_url:location.href,
          fbp:getCookieValue('_fbp'),
          fbc:getCookieValue('_fbc'),
          custom_data:customData
        })
      }).catch(()=>{});
    };
    const metaTrack=(eventName,customData={},sendCapi=true)=>{
      const eventId=makeMetaEventId(eventName);
      if(typeof window.fbq==='function'){
        window.fbq('track',eventName,customData,{eventID:eventId});
      }
      if(sendCapi) metaCapiSend(eventName,eventId,customData);
      return eventId;
    };

    const searchInput=document.getElementById('searchInput');
    const searchButton=document.getElementById('searchButton');
    const searchUnavailable=document.getElementById('searchUnavailable');
    const backToProduct=document.getElementById('backToProduct');
    let searchScrollY=0;
    let searchTimer=null;

    const openSearchUnavailable=()=>{
      if(!searchInput.value.trim()) return;
      searchScrollY=window.scrollY;
      window.clearTimeout(searchTimer);
      searchUnavailable.classList.add('open','loading');
      searchUnavailable.setAttribute('aria-hidden','false');
      document.body.classList.add('search-unavailable-open');

      searchTimer=window.setTimeout(()=>{
        searchUnavailable.classList.remove('loading');
        window.setTimeout(()=>backToProduct.focus(),80);
      },1500);
    };
    const closeSearchUnavailable=()=>{
      window.clearTimeout(searchTimer);

      searchUnavailable.classList.add('loading');
      backToProduct.disabled=true;
      searchTimer=window.setTimeout(()=>{
        searchUnavailable.classList.remove('open','loading');
        searchUnavailable.setAttribute('aria-hidden','true');
        document.body.classList.remove('search-unavailable-open');
        backToProduct.disabled=false;
        window.scrollTo(0,searchScrollY);
        window.setTimeout(()=>searchInput.focus(),120);
      },900);
    };
    searchButton.addEventListener('click',openSearchUnavailable);
    searchInput.addEventListener('keydown',event=>{
      if(event.key==='Enter'){
        event.preventDefault();
        openSearchUnavailable();
      }
    });
    backToProduct.addEventListener('click',closeSearchUnavailable);

    const heroImg=document.getElementById('heroImg');
    const heroVideo=document.getElementById('heroVideo');
    const galleryMain=document.getElementById('galleryMain');
    const galleryPrev=document.getElementById('galleryPrev');
    const galleryNext=document.getElementById('galleryNext');
    const galleryThumbs=[...document.querySelectorAll('.thumb')];
    const variantButtons=[...document.querySelectorAll('.variant-option')];
    const galleryItems=galleryThumbs.map(thumb=>({
      type:thumb.dataset.type || 'image',
      src:thumb.dataset.src || thumb.querySelector('img,video')?.getAttribute('src') || ''
    }));
    let galleryIndex=0;
    let galleryTimer=null;
    let galleryAutoplayEnabled=true;
    let selectedVariant='kit-12';
    const variantToIndex={'kit-12':0};

    const setActiveVariant=(variant)=>{
      variantButtons.forEach(btn=>{
        const active=btn.dataset.variant===variant;
        btn.classList.toggle('active',active);
        btn.setAttribute('aria-pressed',active?'true':'false');
      });
    };

    const renderGalleryItem=(item)=>{
      if(item.type==='video'){
        heroImg.style.display='none';
        heroVideo.style.display='block';
        if(heroVideo.getAttribute('src')!==item.src){
          heroVideo.setAttribute('src',item.src);
          heroVideo.load();
        }
        heroVideo.currentTime=0;
      }else{
        heroVideo.pause();
        heroVideo.style.display='none';
        heroImg.style.display='block';
        heroImg.classList.add('changing');
        window.setTimeout(()=>{
          heroImg.src=item.src;
          heroImg.classList.remove('changing');
        },90);
      }
    };

    const showGalleryImage=(index,restartTimer=false)=>{
      galleryIndex=(index+galleryItems.length)%galleryItems.length;
      galleryThumbs.forEach((thumb,i)=>thumb.classList.toggle('active',i===galleryIndex));
      renderGalleryItem(galleryItems[galleryIndex]);
      if(restartTimer) galleryAutoplayEnabled=true;
      if(galleryAutoplayEnabled && !document.hidden) startGalleryAutoplay();
    };
    const startGalleryAutoplay=()=>{
      if(!galleryAutoplayEnabled) return;
      window.clearTimeout(galleryTimer);
      const currentItem=galleryItems[galleryIndex];
      if(!currentItem) return;
      if(currentItem.type==='video'){
        heroVideo.currentTime=0;
        const playPromise=heroVideo.play();
        if(playPromise && typeof playPromise.catch==='function'){ playPromise.catch(()=>{}); }
        return;
      }
      galleryTimer=window.setTimeout(()=>showGalleryImage(galleryIndex+1),3000);
    };
    const stopGalleryAutoplay=()=>window.clearTimeout(galleryTimer);
    const freezeGallerySelection=()=>{
      galleryAutoplayEnabled=false;
      stopGalleryAutoplay();
    };

    galleryThumbs.forEach((thumb,index)=>thumb.addEventListener('click',()=>showGalleryImage(index,true)));
    galleryPrev.addEventListener('click',()=>showGalleryImage(galleryIndex-1,true));
    galleryNext.addEventListener('click',()=>showGalleryImage(galleryIndex+1,true));
    galleryMain.addEventListener('mouseenter',stopGalleryAutoplay);
    galleryMain.addEventListener('mouseleave',startGalleryAutoplay);
    heroVideo.addEventListener('play',stopGalleryAutoplay);
    heroVideo.addEventListener('pause',()=>{
      const currentItem=galleryItems[galleryIndex];
      if(currentItem && currentItem.type!=='video' && !document.hidden) startGalleryAutoplay();
    });
    heroVideo.addEventListener('ended',()=>{
      if(galleryAutoplayEnabled && !document.hidden) showGalleryImage(galleryIndex+1,false);
    });
    document.addEventListener('visibilitychange',()=>document.hidden?stopGalleryAutoplay():startGalleryAutoplay());

    variantButtons.forEach(button=>{
      button.addEventListener('click',()=>{
        const variant=button.dataset.variant;
        const targetIndex=variantToIndex[variant];
        if(typeof targetIndex==='number'){
          selectedVariant=variant;
          setActiveVariant(variant);
          freezeGallerySelection();
          showGalleryImage(targetIndex,false);
          applyVariantSelection();
        }
      });
    });

    showGalleryImage(0);
    startGalleryAutoplay();
    let q=1;
    const qty=document.getElementById('qty');
    const plusBtn=document.getElementById('plus');
    const minusBtn=document.getElementById('minus');
    const promoPrice=document.getElementById('promoPrice');
    const oldPrice=document.getElementById('oldPrice');
    const buyPrice=document.getElementById('buyPrice');
    const flashPrice=document.getElementById('flashPrice');
    const flashSubPrice=document.getElementById('flashSubPrice');

    const priceConfig={
      'kit-12':{promo:8.90,regular:19.90,maxQty:3}
    };
    const currentVariant=()=>['kit-12'].includes(selectedVariant)?selectedVariant:'kit-12';
    const currentPriceConfig=()=>priceConfig[currentVariant()];
    const brl=value=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/ /g,'');

    const updateQuantityPrice=()=>{
      const config=currentPriceConfig();
      if(q>config.maxQty) q=config.maxQty;
      if(q<1) q=1;
      qty.value=q;
      if(promoPrice) promoPrice.textContent=brl(config.promo*q);
      if(oldPrice) oldPrice.textContent=brl(config.regular*q);
      buyPrice.textContent=brl(config.promo*q);
      if(flashPrice) flashPrice.textContent=brl(config.promo*q);
      if(flashSubPrice) flashSubPrice.textContent=brl(config.regular*q);
      minusBtn.disabled=q<=1;
      plusBtn.disabled=q>=config.maxQty;
    };

    const applyVariantSelection=()=>{
      updateQuantityPrice();
    };

    plusBtn.onclick=()=>{
      const config=currentPriceConfig();
      if(q<config.maxQty){q++;updateQuantityPrice();}
    };
    minusBtn.onclick=()=>{if(q>1){q--;updateQuantityPrice();}};
    updateQuantityPrice();

    document.querySelectorAll('.like').forEach(likeBtn=>{
      const countEl=likeBtn.querySelector('.like-count');
      const baseCount=Number(likeBtn.dataset.count || countEl?.textContent || 0);
      likeBtn.dataset.count=String(baseCount);
      likeBtn.addEventListener('click',()=>{
        const liked=!likeBtn.classList.contains('liked');
        likeBtn.classList.toggle('liked',liked);
        likeBtn.setAttribute('aria-pressed',String(liked));
        likeBtn.setAttribute('aria-label',liked?'Remover curtida da avaliação':'Curtir avaliação');
        if(countEl) countEl.textContent=String(baseCount+(liked?1:0));
        likeBtn.classList.remove('like-pop');
        void likeBtn.offsetWidth;
        if(liked) likeBtn.classList.add('like-pop');
      });
      likeBtn.addEventListener('animationend',()=>likeBtn.classList.remove('like-pop'));
    });

    const reviewViewer=document.getElementById('reviewViewer');
    const reviewViewerImg=document.getElementById('reviewViewerImg');
    const reviewViewerVideo=document.getElementById('reviewViewerVideo');
    const reviewViewerClose=document.getElementById('reviewViewerClose');
    const reviewViewerPrev=document.getElementById('reviewViewerPrev');
    const reviewViewerNext=document.getElementById('reviewViewerNext');
    const reviewViewerCount=document.getElementById('reviewViewerCount');
    let reviewViewerItems=[];
    let reviewViewerIndex=0;

    const updateReviewViewer=()=>{
      if(!reviewViewerItems.length) return;
      const item=reviewViewerItems[reviewViewerIndex];
      if(item.type==='video'){
        reviewViewerImg.style.display='none';
        reviewViewerVideo.style.display='block';
        reviewViewerVideo.src=item.src;
        reviewViewerVideo.currentTime=0;
        const playPromise=reviewViewerVideo.play();
        if(playPromise && typeof playPromise.catch==='function'){ playPromise.catch(()=>{}); }
      }else{
        reviewViewerVideo.pause();
        reviewViewerVideo.removeAttribute('src');
        reviewViewerVideo.load();
        reviewViewerVideo.style.display='none';
        reviewViewerImg.style.display='block';
        reviewViewerImg.src=item.src;
      }
      reviewViewerCount.textContent=`${reviewViewerIndex+1} / ${reviewViewerItems.length}`;
      reviewViewerPrev.disabled=reviewViewerIndex<=0;
      reviewViewerNext.disabled=reviewViewerIndex>=reviewViewerItems.length-1;
    };
    const openReviewViewer=(items,startIndex=0)=>{
      reviewViewerItems=items.slice();
      reviewViewerIndex=startIndex;
      updateReviewViewer();
      reviewViewer.classList.add('open');
      reviewViewer.setAttribute('aria-hidden','false');
      document.body.classList.add('review-viewer-open');
    };
    const closeReviewViewer=()=>{
      reviewViewerVideo.pause();
      reviewViewer.classList.remove('open');
      reviewViewer.setAttribute('aria-hidden','true');
      document.body.classList.remove('review-viewer-open');
    };

    document.querySelectorAll('.review').forEach(reviewEl=>{
      const mediaEls=[...reviewEl.querySelectorAll('.media img, .media video')];
      const items=mediaEls.map(el=>({type: el.tagName.toLowerCase()==='video' ? 'video' : 'image', src: el.getAttribute('src')}));
      mediaEls.forEach((el,index)=>{
        el.addEventListener('click',()=>openReviewViewer(items,index));
      });
    });

    reviewViewerPrev.addEventListener('click',()=>{ if(reviewViewerIndex>0){ reviewViewerIndex--; updateReviewViewer(); } });
    reviewViewerNext.addEventListener('click',()=>{ if(reviewViewerIndex<reviewViewerItems.length-1){ reviewViewerIndex++; updateReviewViewer(); } });
    reviewViewerClose.addEventListener('click',closeReviewViewer);
    reviewViewer.addEventListener('click',event=>{ if(event.target===reviewViewer) closeReviewViewer(); });
    document.addEventListener('keydown',event=>{
      if(!reviewViewer.classList.contains('open')) return;
      if(event.key==='Escape') closeReviewViewer();
      if(event.key==='ArrowLeft' && reviewViewerIndex>0){ reviewViewerIndex--; updateReviewViewer(); }
      if(event.key==='ArrowRight' && reviewViewerIndex<reviewViewerItems.length-1){ reviewViewerIndex++; updateReviewViewer(); }
    });

    const cepInput=document.getElementById('cep');
    const cepStatus=document.getElementById('cepStatus');
    const freteValor=document.getElementById('freteValor');
    const freteOriginal=document.getElementById('freteOriginal');
    const freteHeadline=document.getElementById('freteHeadline');
    const calcCep=document.getElementById('calcCep');
    let cepTimer=null;
    const formatCep=value=>{
      const digits=value.replace(/\D/g,'').slice(0,8);
      return digits.length>5 ? digits.slice(0,5)+'-'+digits.slice(5) : digits;
    };
    const consultarCep=()=>{
      const digits=cepInput.value.replace(/\D/g,'');
      clearTimeout(cepTimer);
      cepStatus.classList.remove('error');
      if(digits.length!==8){
        cepStatus.textContent='Digite um CEP válido com 8 números.';
        cepStatus.classList.add('error');
        freteHeadline.textContent='Calcule o frete para sua região';
        freteHeadline.style.color='#fff';
        freteValor.textContent='—';
        freteValor.classList.remove('frete-zero');
        freteOriginal.hidden=true;
        freteOriginal.textContent='';
        return;
      }
      cepInput.value=formatCep(digits);
      calcCep.disabled=true;
      calcCep.textContent='Calculando';
      cepStatus.innerHTML='<span class="cep-loading"><span class="cep-spinner"></span>Calculando frete...</span>';
      freteHeadline.textContent='Verificando disponibilidade';
      freteHeadline.style.color='#fff';
      freteValor.textContent='—';
      freteValor.classList.remove('frete-zero');
      freteOriginal.hidden=true;
      freteOriginal.textContent='';

      cepTimer=setTimeout(()=>{
        calcCep.disabled=false;
        calcCep.textContent='Calcular';
        freteHeadline.innerHTML='<span class="ship-success"><img src="assets/truck-green.png" alt="" aria-hidden="true">Frete grátis</span>';
        cepStatus.innerHTML='<span>Cupom aplicado</span><span>•</span><span>Entrega disponível para o CEP '+formatCep(digits)+'</span>';
        const freteCheio=6.71;
        freteOriginal.textContent=freteCheio.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
        freteOriginal.hidden=false;
        freteValor.textContent='R$0,00';
        freteValor.classList.add('frete-zero');
        sessionStorage.setItem('brbbCheckoutCep', digits);
      },1500);
    };
    cepInput.addEventListener('input',()=>{
      clearTimeout(cepTimer);
      cepInput.value=formatCep(cepInput.value);
      calcCep.disabled=false;
      calcCep.textContent='Calcular';
      cepStatus.classList.remove('error');
      cepStatus.textContent='Frete grátis com cupom. Informe seu CEP para verificar a entrega.';
      freteHeadline.textContent='Calcule o frete para sua região';
      freteHeadline.style.color='#fff';
      freteValor.textContent='—';
      freteValor.classList.remove('frete-zero');
      freteOriginal.hidden=true;
      freteOriginal.textContent='';
    });
    cepInput.addEventListener('keydown',e=>{if(e.key==='Enter') consultarCep();});
    calcCep.addEventListener('click',consultarCep);

    const addToCart=document.getElementById('addToCart');
    const cartToast=document.getElementById('cartToast');
    const cartLoadingToast=document.getElementById('cartLoadingToast');
    let cartToastTimer=null;
    let cartLoadingTimer=null;
    const headerCart=document.getElementById('headerCart');
    const headerCartCount=document.getElementById('headerCartCount');
    const buyNow=document.getElementById('buyNow');
    const syncCartCount=()=>{
      const cartQty=Math.max(0,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||0)));
      if(headerCartCount) headerCartCount.textContent=String(cartQty);
    };
    syncCartCount();

    addToCart.addEventListener('click',()=>{
      clearTimeout(cartToastTimer);
      clearTimeout(cartLoadingTimer);
      cartToast.classList.remove('show');
      cartLoadingToast.classList.add('show');
      cartLoadingToast.setAttribute('aria-hidden','false');

      cartLoadingTimer=setTimeout(()=>{
        const cartVariant=currentVariant();
        const cartConfig=currentPriceConfig();
        sessionStorage.setItem('brbbCartQty', String(q));
        sessionStorage.setItem('brbbCartUnitPrice', String(cartConfig.promo));
        sessionStorage.setItem('brbbCartVariant', cartVariant);
        metaTrack('AddToCart',{
          content_name:'Kit 12 Pares de Brincos Pontos de Luz - '+cartVariant.replace('kit-','Kit '),
          content_type:'product',
          content_ids:['kit-12-pares-ponto-luz'],
          currency:'BRL',
          value:metaMoneyValue(q,cartVariant),
          num_items:q
        });
        syncCartCount();
        cartLoadingToast.classList.remove('show');
        cartLoadingToast.setAttribute('aria-hidden','true');
        cartToast.classList.add('show');
        cartToastTimer=setTimeout(()=>cartToast.classList.remove('show'),1500);
      },600);
    });

    if(buyNow){
      buyNow.addEventListener('click',()=>{
        const cartVariant=currentVariant();
        const cartConfig=currentPriceConfig();
        sessionStorage.setItem('brbbCartQty', String(q));
        sessionStorage.setItem('brbbCartUnitPrice', String(cartConfig.promo));
        sessionStorage.setItem('brbbCartVariant', cartVariant);
        openIntegratedCheckout();
      });
    }

    if(headerCart){
      headerCart.addEventListener('click',()=>{
        const cartQty=Number(sessionStorage.getItem('brbbCartQty')||0);
        if(cartQty>0){
          openIntegratedCheckout();
        }else{
          clearTimeout(cartToastTimer);
          cartToast.querySelector('.cart-toast-text').textContent='Seu carrinho está vazio';
          cartToast.classList.add('show');
          cartToastTimer=setTimeout(()=>{
            cartToast.classList.remove('show');
            cartToast.querySelector('.cart-toast-text').textContent='Item adicionado ao carrinho';
          },1300);
        }
      });
    }

    const favoriteBtn=document.getElementById('favoriteBtn');
    favoriteBtn.addEventListener('click',()=>{
      const active=favoriteBtn.classList.toggle('active');
      favoriteBtn.setAttribute('aria-pressed',String(active));
      favoriteBtn.querySelector('.heart').textContent=active?'♥':'♡';
    });

    const followBtn=document.getElementById('followBtn');
    followBtn.addEventListener('click',()=>{
      const following=followBtn.classList.toggle('following');
      followBtn.setAttribute('aria-pressed',String(following));
      followBtn.textContent=following?'✓ Seguindo':'＋ Seguir';
    });

    const moreMenuBtn=document.getElementById('moreMenuBtn');
    const helpPopover=document.getElementById('helpPopover');
    const setHelpOpen=open=>{
      helpPopover.classList.toggle('open',open);
      helpPopover.setAttribute('aria-hidden',String(!open));
      moreMenuBtn.setAttribute('aria-expanded',String(open));
    };
    moreMenuBtn.addEventListener('click',event=>{
      event.stopPropagation();
      setHelpOpen(!helpPopover.classList.contains('open'));
    });
    helpPopover.addEventListener('click',event=>event.stopPropagation());
    document.addEventListener('click',()=>setHelpOpen(false));
    document.addEventListener('keydown',event=>{if(event.key==='Escape') setHelpOpen(false);});

    const updateHeaderCompact=()=>document.body.classList.toggle('header-scrolled',window.scrollY>24);
    let headerScrollTick=false;
    window.addEventListener('scroll',()=>{
      if(headerScrollTick) return;
      headerScrollTick=true;
      window.requestAnimationFrame(()=>{updateHeaderCompact();headerScrollTick=false;});
    },{passive:true});
    updateHeaderCompact();

    const flashHours=document.getElementById('flashHours');
    const flashMinutes=document.getElementById('flashMinutes');
    const flashSeconds=document.getElementById('flashSeconds');
    let flashRemaining=24*60*60 + 30*60;
    const pad2=value=>String(value).padStart(2,'0');
    const updateFlashCountdown=()=>{
      const hours=Math.floor(flashRemaining/3600);
      const minutes=Math.floor((flashRemaining%3600)/60);
      const seconds=flashRemaining%60;
      if(flashHours) flashHours.textContent=pad2(hours);
      if(flashMinutes) flashMinutes.textContent=pad2(minutes);
      if(flashSeconds) flashSeconds.textContent=pad2(seconds);
    };
    updateFlashCountdown();
    window.setInterval(()=>{
      flashRemaining=flashRemaining>0?flashRemaining-1:24*60*60 + 30*60;
      updateFlashCountdown();
    },1000);

    document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
  

  (() => {
    const overlay=document.getElementById('checkoutOverlay');
    const back=document.getElementById('checkoutBack');

    const recipient=document.getElementById('coRecipient');
    const cpf=document.getElementById('coCpf');
    const cpfStatus=document.getElementById('coCpfStatus');
    const cep=document.getElementById('coCep');
    const lookup=document.getElementById('coLookupCep');
    const cepStatus=document.getElementById('coCepStatus');
    const street=document.getElementById('coStreet');
    const district=document.getElementById('coDistrict');
    const city=document.getElementById('coCity');
    const uf=document.getElementById('coUf');
    const number=document.getElementById('coNumber');

    const notice=document.getElementById('checkoutNotice');
    const noticeTitle=document.getElementById('checkoutNoticeTitle');
    const noticeText=document.getElementById('checkoutNoticeText');

    let noticeTimer=null;

    const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/\u00a0/g,'');
    const onlyDigits=v=>String(v||'').replace(/\D/g,'');
    const formatCep=v=>{
      const d=onlyDigits(v).slice(0,8);
      return d.length>5?d.slice(0,5)+'-'+d.slice(5):d;
    };
    const formatCpf=v=>{
      const d=onlyDigits(v).slice(0,11);
      return d
        .replace(/^(\d{3})(\d)/,'$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/,'$1.$2.$3')
        .replace(/\.(\d{3})(\d)/,'.$1-$2');
    };

    const validCpf=value=>{
      const d=onlyDigits(value);
      if(d.length!==11 || /^(\d)\1{10}$/.test(d)) return false;
      let sum=0;
      for(let i=0;i<9;i++) sum+=Number(d[i])*(10-i);
      let r=(sum*10)%11;
      if(r===10) r=0;
      if(r!==Number(d[9])) return false;
      sum=0;
      for(let i=0;i<10;i++) sum+=Number(d[i])*(11-i);
      r=(sum*10)%11;
      if(r===10) r=0;
      return r===Number(d[10]);
    };

    const clearAddress=()=>{
      street.value=''; district.value=''; city.value=''; uf.value='';
    };

    const refreshTotals=()=>{
      const variant=sessionStorage.getItem('brbbCartVariant')||'kit-12';
      const validVariant=['kit-12'].includes(variant)?variant:'kit-12';
      const qty=Math.max(1,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||1)));
      const unit=8.90;
      const total=unit*qty;

      sessionStorage.setItem('brbbCartQty',String(qty));
      sessionStorage.setItem('brbbCartUnitPrice',String(unit));
      sessionStorage.setItem('brbbCartVariant',validVariant);

      const productImage=document.getElementById('coProductImage');
      const productName=document.getElementById('coProductName');
      const variantText=document.getElementById('coVariantText');
      const couponBadge=document.getElementById('coCouponBadge');

      if(productImage){
        productImage.src='assets/ponto-luz-12-pares-01.png';
        productImage.alt='Kit 12 pares de brincos pontos de luz';
      }
      if(productName){
        productName.textContent='Kit 12 Pares de Brincos Pontos de Luz Femininos com Zircônia Vários Tamanhos';
      }
      if(variantText){
        variantText.textContent='Kit: 12 pares de brincos pontos de luz';
      }
      if(couponBadge) couponBadge.textContent='15% OFF';

      document.getElementById('coQtyText').textContent='Quantidade: '+qty;
      ['coItemSubtotal','coProductsTotal','coOrderTotal','coBottomTotal'].forEach(id=>{
        document.getElementById(id).textContent=money(total);
      });
    };

    const showNotice=(title,msg)=>{
      clearTimeout(noticeTimer);
      noticeTitle.textContent=title;
      noticeText.textContent=msg;
      notice.classList.add('show');
      noticeTimer=setTimeout(()=>notice.classList.remove('show'),2300);
    };

    const lookupCep=async()=>{
      const digits=onlyDigits(cep.value);
      if(digits.length!==8){
        clearAddress();
        cepStatus.className='checkout-status error';
        cepStatus.textContent='Digite um CEP válido com 8 números.';
        return false;
      }

      cep.value=formatCep(digits);
      lookup.disabled=true;
      cepStatus.className='checkout-status';
      cepStatus.innerHTML='<span class="checkout-spinner"></span>Consultando endereço...';

      try{
        const res=await fetch('https://viacep.com.br/ws/'+digits+'/json/');
        if(!res.ok) throw new Error('Falha');
        const data=await res.json();
        if(data.erro) throw new Error('CEP não encontrado');

        street.value=data.logradouro||'';
        district.value=data.bairro||'';
        city.value=data.localidade||'';
        uf.value=data.uf||'';

        sessionStorage.setItem('brbbCheckoutCep',digits);
        cepStatus.className='checkout-status ok';
        cepStatus.textContent='Endereço localizado. Frete grátis para este CEP.';
        return true;
      }catch(err){
        clearAddress();
        cepStatus.className='checkout-status error';
        cepStatus.textContent=err.message==='CEP não encontrado'
          ? 'CEP não encontrado.'
          : 'Não foi possível consultar o CEP agora.';
        return false;
      }finally{
        lookup.disabled=false;
      }
    };

    const checkoutTransitionLoader=document.getElementById('checkoutTransitionLoader');
    let checkoutTransitionTimer=null;
    let checkoutTransitionBusy=false;

    const showCheckoutTransition=()=>{
      checkoutTransitionLoader.classList.add('show');
      checkoutTransitionLoader.setAttribute('aria-hidden','false');
    };

    const hideCheckoutTransition=()=>{
      checkoutTransitionLoader.classList.remove('show');
      checkoutTransitionLoader.setAttribute('aria-hidden','true');
    };

    window.openIntegratedCheckout=()=>{
      if(checkoutTransitionBusy || overlay.classList.contains('open')) return;
      checkoutTransitionBusy=true;
      clearTimeout(checkoutTransitionTimer);

      refreshTotals();
      const metaCheckoutVariant=sessionStorage.getItem('brbbCartVariant')||'kit-12';
      const metaCheckoutQty=Math.max(1,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||1)));
      metaTrack('InitiateCheckout',{
        content_name:'Kit 12 Pares de Brincos Pontos de Luz - '+metaCheckoutVariant.replace('kit-','Kit '),
        content_type:'product',
        content_ids:['kit-12-pares-ponto-luz'],
        currency:'BRL',
        value:metaMoneyValue(metaCheckoutQty,metaCheckoutVariant),
        num_items:metaCheckoutQty
      });

      const mainCep=document.getElementById('cep');
      const mainCepDigits=mainCep ? onlyDigits(mainCep.value) : '';
      if(mainCepDigits.length===8){
        sessionStorage.setItem('brbbCheckoutCep',mainCepDigits);
      }

      const savedCep=sessionStorage.getItem('brbbCheckoutCep');
      if(savedCep && onlyDigits(cep.value)!==savedCep){
        cep.value=formatCep(savedCep);
        lookupCep();
      }else if(savedCep && !street.value){
        lookupCep();
      }

      document.body.classList.add('checkout-open');
      showCheckoutTransition();

      checkoutTransitionTimer=setTimeout(()=>{
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden','false');
        overlay.scrollTop=0;
        hideCheckoutTransition();
        checkoutTransitionBusy=false;
        setTimeout(()=>recipient.focus(),120);
      },1000);
    };

    window.closeIntegratedCheckout=()=>{
      if(checkoutTransitionBusy || !overlay.classList.contains('open')) return;
      checkoutTransitionBusy=true;
      clearTimeout(checkoutTransitionTimer);

      showCheckoutTransition();

      checkoutTransitionTimer=setTimeout(()=>{
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden','true');
        document.body.classList.remove('checkout-open');
        hideCheckoutTransition();
        checkoutTransitionBusy=false;
      },1000);
    };

    back.addEventListener('click',window.closeIntegratedCheckout);

    cep.addEventListener('input',()=>{
      cep.value=formatCep(cep.value);
      clearAddress();
      cepStatus.className='checkout-status';
      cepStatus.textContent='Digite o CEP para preencher o endereço.';
    });
    cep.addEventListener('keydown',e=>{
      if(e.key==='Enter'){e.preventDefault();lookupCep();}
    });
    lookup.addEventListener('click',lookupCep);

    uf.addEventListener('input',()=>{
      uf.value=uf.value.replace(/[^a-zA-Z]/g,'').slice(0,2).toUpperCase();
    });

    cpf.addEventListener('input',()=>{
      cpf.value=formatCpf(cpf.value);
      const d=onlyDigits(cpf.value);
      cpfStatus.className='checkout-status';

      if(d.length<11){
        cpfStatus.textContent='Validação local pelos dígitos verificadores.';
        return;
      }

      const ok=validCpf(cpf.value);
      cpfStatus.className='checkout-status '+(ok?'ok':'error');
      cpfStatus.textContent=ok?'CPF com dígitos verificadores válidos.':'CPF inválido.';
    });

    document.getElementById('coPayPix').addEventListener('click',()=>{
      if(!recipient.value.trim()){
        return showNotice('Confira seus dados','Informe o nome do destinatário.');
      }
      if(!validCpf(cpf.value)){
        return showNotice('CPF inválido','Digite um CPF com dígitos verificadores válidos.');
      }
      if(onlyDigits(cep.value).length!==8 || !street.value || !city.value || !uf.value){
        return showNotice('Endereço incompleto','Informe CEP, rua, cidade e UF antes de continuar.');
      }
      if(!number.value.trim()){
        return showNotice('Endereço incompleto','Informe o número do endereço.');
      }

      const checkoutVariant=sessionStorage.getItem('brbbCartVariant')||'kit-12';
      const checkoutQty=Math.max(1,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||1)));

      const pixCheckoutByQty={
        1:'https://pay.veopag.com/shopeepagamentos-ltda-3c0c42',
        2:'https://pay.veopag.com/shopeepagamentos-ltda-f1aaf8',
        3:'https://pay.veopag.com/shopeepagamentos-ltda-4f1d76'
      };
      const pixUrl=pixCheckoutByQty[checkoutQty]||pixCheckoutByQty[1];

      metaTrack('AddPaymentInfo',{
        content_name:'Kit 12 Pares de Brincos Pontos de Luz - '+checkoutVariant.replace('kit-','Kit '),
        content_type:'product',
        content_ids:['kit-12-pares-ponto-luz'],
        currency:'BRL',
        value:metaMoneyValue(checkoutQty,checkoutVariant),
        num_items:checkoutQty
      });
      window.location.href=pixUrl;
    });
  })();
  
document.querySelectorAll('.social-link').forEach(link=>{
  link.addEventListener('click',event=>event.preventDefault());
});

(() => {
  // Mantido apenas para compatibilidade; as miniaturas agora são estáticas.
  return;
  const reviewVideos=[...document.querySelectorAll('.review .media video')];
  if(!reviewVideos.length) return;

  const icons={
    play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    volume:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm11.5-.8v7.6a6 6 0 0 0 0-7.6z"/></svg>',
    muted:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/></svg>'
  };

  const syncPlayButton=(video,button)=>{
    const paused=video.paused || video.ended;
    button.innerHTML=icons[paused?'play':'pause'];
    button.setAttribute('aria-label',paused?'Reproduzir vídeo':'Pausar vídeo');
    button.title=paused?'Reproduzir':'Pausar';
  };

  const syncVolumeButton=(video,button)=>{
    button.innerHTML=icons[video.muted?'muted':'volume'];
    button.setAttribute('aria-label',video.muted?'Ativar som':'Silenciar vídeo');
    button.title=video.muted?'Ativar som':'Silenciar';
  };

  reviewVideos.forEach(video=>{
    if(video.closest('.review-video-shell')) return;
    video.removeAttribute('controls');
    video.classList.add('review-custom-video');

    const shell=document.createElement('span');
    shell.className='review-video-shell';
    video.parentNode.insertBefore(shell,video);
    shell.appendChild(video);

    const controls=document.createElement('span');
    controls.className='review-mini-controls';
    controls.setAttribute('role','group');
    controls.setAttribute('aria-label','Controles do vídeo da avaliação');

    const playButton=document.createElement('button');
    playButton.type='button';
    playButton.className='review-mini-control play';

    const progress=document.createElement('input');
    progress.className='review-mini-progress';
    progress.type='range';
    progress.min='0';
    progress.max='1000';
    progress.value='0';
    progress.setAttribute('aria-label','Progresso do vídeo');
    progress.style.setProperty('--review-progress','0%');

    const volumeButton=document.createElement('button');
    volumeButton.type='button';
    volumeButton.className='review-mini-control volume';

    controls.append(playButton,progress,volumeButton);
    shell.appendChild(controls);

    ['click','dblclick','pointerdown','touchstart'].forEach(type=>{
      controls.addEventListener(type,event=>event.stopPropagation(),{passive:type==='touchstart'});
    });

    playButton.addEventListener('click',()=>{
      if(video.paused || video.ended){
        reviewVideos.forEach(other=>{if(other!==video) other.pause();});
        const playPromise=video.play();
        if(playPromise && typeof playPromise.catch==='function') playPromise.catch(()=>{});
      }else{
        video.pause();
      }
    });

    volumeButton.addEventListener('click',()=>{
      video.muted=!video.muted;
      syncVolumeButton(video,volumeButton);
    });

    progress.addEventListener('input',()=>{
      if(Number.isFinite(video.duration) && video.duration>0){
        video.currentTime=(Number(progress.value)/1000)*video.duration;
      }
    });

    const syncProgress=()=>{
      const ratio=Number.isFinite(video.duration) && video.duration>0 ? video.currentTime/video.duration : 0;
      const value=Math.max(0,Math.min(1000,Math.round(ratio*1000)));
      progress.value=String(value);
      progress.style.setProperty('--review-progress',`${value/10}%`);
    };

    video.addEventListener('play',()=>syncPlayButton(video,playButton));
    video.addEventListener('pause',()=>syncPlayButton(video,playButton));
    video.addEventListener('ended',()=>{syncPlayButton(video,playButton);syncProgress();});
    video.addEventListener('timeupdate',syncProgress);
    video.addEventListener('loadedmetadata',syncProgress);
    video.addEventListener('volumechange',()=>syncVolumeButton(video,volumeButton));

    syncPlayButton(video,playButton);
    syncVolumeButton(video,volumeButton);
    syncProgress();
  });
})();

(() => {
  const previewVideos=[...document.querySelectorAll('.review .media video')];

  previewVideos.forEach(video=>{
    video.pause();
    const preview=document.createElement('button');
    preview.type='button';
    preview.className='review-video-preview';
    preview.setAttribute('aria-label','Abrir vídeo da avaliação');

    const image=document.createElement('img');
    image.src=video.getAttribute('poster') || '';
    image.alt='Prévia do vídeo da avaliação';
    image.loading='lazy';

    const badge=document.createElement('span');
    badge.className='review-video-play-badge';
    badge.setAttribute('aria-hidden','true');

    preview.append(image,badge);
    preview.addEventListener('click',event=>{
      event.preventDefault();
      video.click();
    });
    video.replaceWith(preview);
  });

  const video=document.getElementById('reviewViewerVideo');
  if(!video || video.closest('.review-viewer-video-shell')) return;
  video.removeAttribute('controls');

  const icons={
    play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    volume:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm11.5-.8v7.6a6 6 0 0 0 0-7.6z"/></svg>',
    muted:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/></svg>',
    fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm14 0h2v6h-6v-2h4v-4z"/></svg>'
  };

  const shell=document.createElement('div');
  shell.className='review-viewer-video-shell';
  video.parentNode.insertBefore(shell,video);
  shell.appendChild(video);

  const controls=document.createElement('div');
  controls.className='review-viewer-custom-controls';
  controls.setAttribute('role','group');
  controls.setAttribute('aria-label','Controles do vídeo');

  const playButton=document.createElement('button');
  playButton.type='button';
  playButton.className='review-viewer-control play';

  const progress=document.createElement('input');
  progress.type='range';
  progress.className='review-viewer-progress';
  progress.min='0';
  progress.max='1000';
  progress.value='0';
  progress.setAttribute('aria-label','Progresso do vídeo');
  progress.style.setProperty('--viewer-progress','0%');

  const time=document.createElement('span');
  time.className='review-viewer-time';
  time.textContent='0:00 / 0:00';

  const volumeButton=document.createElement('button');
  volumeButton.type='button';
  volumeButton.className='review-viewer-control volume';

  const fullscreenButton=document.createElement('button');
  fullscreenButton.type='button';
  fullscreenButton.className='review-viewer-control fullscreen';
  fullscreenButton.innerHTML=icons.fullscreen;
  fullscreenButton.setAttribute('aria-label','Tela cheia');
  fullscreenButton.title='Tela cheia';

  controls.append(playButton,progress,time,volumeButton,fullscreenButton);
  shell.appendChild(controls);

  const formatTime=value=>{
    if(!Number.isFinite(value) || value<0) return '0:00';
    const minutes=Math.floor(value/60);
    const seconds=Math.floor(value%60).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
  };

  const syncPlay=()=>{
    const paused=video.paused || video.ended;
    playButton.innerHTML=icons[paused?'play':'pause'];
    playButton.setAttribute('aria-label',paused?'Reproduzir vídeo':'Pausar vídeo');
    playButton.title=paused?'Reproduzir':'Pausar';
  };

  const syncVolume=()=>{
    volumeButton.innerHTML=icons[video.muted?'muted':'volume'];
    volumeButton.setAttribute('aria-label',video.muted?'Ativar som':'Silenciar vídeo');
    volumeButton.title=video.muted?'Ativar som':'Silenciar';
  };

  const syncProgress=()=>{
    const duration=Number.isFinite(video.duration) ? video.duration : 0;
    const ratio=duration>0 ? video.currentTime/duration : 0;
    const value=Math.max(0,Math.min(1000,Math.round(ratio*1000)));
    progress.value=String(value);
    progress.style.setProperty('--viewer-progress',`${value/10}%`);
    time.textContent=`${formatTime(video.currentTime)} / ${formatTime(duration)}`;
  };

  const syncVisibility=()=>{
    const visible=video.style.display!=='none' && Boolean(video.getAttribute('src'));
    shell.style.display=visible?'flex':'none';
  };

  playButton.addEventListener('click',()=>{
    if(video.paused || video.ended){
      const playPromise=video.play();
      if(playPromise && typeof playPromise.catch==='function') playPromise.catch(()=>{});
    }else{
      video.pause();
    }
  });

  progress.addEventListener('input',()=>{
    if(Number.isFinite(video.duration) && video.duration>0){
      video.currentTime=(Number(progress.value)/1000)*video.duration;
    }
  });

  volumeButton.addEventListener('click',()=>{
    video.muted=!video.muted;
    syncVolume();
  });

  fullscreenButton.addEventListener('click',()=>{
    if(document.fullscreenElement){
      document.exitFullscreen?.();
    }else{
      shell.requestFullscreen?.();
    }
  });

  ['click','dblclick','pointerdown','touchstart'].forEach(type=>{
    controls.addEventListener(type,event=>event.stopPropagation(),{passive:type==='touchstart'});
  });

  video.addEventListener('play',syncPlay);
  video.addEventListener('pause',syncPlay);
  video.addEventListener('ended',()=>{syncPlay();syncProgress();});
  video.addEventListener('timeupdate',syncProgress);
  video.addEventListener('loadedmetadata',syncProgress);
  video.addEventListener('durationchange',syncProgress);
  video.addEventListener('volumechange',syncVolume);

  new MutationObserver(syncVisibility).observe(video,{attributes:true,attributeFilter:['style','src']});
  syncPlay();
  syncVolume();
  syncProgress();
  syncVisibility();
})();
