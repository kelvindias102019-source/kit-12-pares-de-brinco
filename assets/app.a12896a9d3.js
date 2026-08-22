!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1053615244262897');
  fbq('track', 'PageView');
  fbq('track', 'ViewContent', {
    content_name: 'Kit 104 SemiJoias Completo Folheada Ouro 18k Prata 925 Colar/Brincos Refinados Revenda',
    content_type: 'product',
    content_ids: ['kit-104-semijoias'],
    currency: 'BRL',
    value: 57.98
  });
  

    const metaMoneyValue=(qty)=>Number((57.98*Math.max(1,Math.min(3,Number(qty)||1))).toFixed(2));
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
    const galleryItems=galleryThumbs.map(thumb=>({
      type:thumb.dataset.type || 'image',
      src:thumb.dataset.src || thumb.querySelector('img,video')?.getAttribute('src') || ''
    }));
    let galleryIndex=0;
    let galleryTimer=null;

    const renderGalleryItem=(item)=>{
      if(item.type==='video'){
        heroImg.style.display='none';
        heroVideo.style.display='block';
        if(heroVideo.getAttribute('src')!==item.src) heroVideo.setAttribute('src',item.src);
        heroVideo.pause();
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
      if(restartTimer) startGalleryAutoplay();
    };
    const startGalleryAutoplay=()=>{
      window.clearInterval(galleryTimer);
      galleryTimer=window.setInterval(()=>showGalleryImage(galleryIndex+1),3000);
    };
    const stopGalleryAutoplay=()=>window.clearInterval(galleryTimer);

    galleryThumbs.forEach((thumb,index)=>thumb.addEventListener('click',()=>showGalleryImage(index,true)));
    galleryPrev.addEventListener('click',()=>showGalleryImage(galleryIndex-1,true));
    galleryNext.addEventListener('click',()=>showGalleryImage(galleryIndex+1,true));
    galleryMain.addEventListener('mouseenter',stopGalleryAutoplay);
    galleryMain.addEventListener('mouseleave',startGalleryAutoplay);
    heroVideo.addEventListener('play',stopGalleryAutoplay);
    heroVideo.addEventListener('pause',()=>{ if(!document.hidden) startGalleryAutoplay(); });
    heroVideo.addEventListener('ended',()=>{ if(!document.hidden) startGalleryAutoplay(); });
    document.addEventListener('visibilitychange',()=>document.hidden?stopGalleryAutoplay():startGalleryAutoplay());
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
    const unitPromo=57.98;
    const unitOld=115.96;
    const unitFlashSub=65.87;
    const maxQty=3;
    const brl=value=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/ /g,'');
    const updateQuantityPrice=()=>{
      qty.value=q;
      if(promoPrice) promoPrice.textContent=brl(unitPromo*q);
      if(oldPrice) oldPrice.textContent=brl(unitOld*q);
      buyPrice.textContent=brl(unitPromo*q);
      if(flashPrice) flashPrice.textContent=brl(unitPromo*q);
      if(flashSubPrice) flashSubPrice.textContent=brl(unitFlashSub*q);
      minusBtn.disabled=q<=1;
      plusBtn.disabled=q>=maxQty;
    };
    plusBtn.onclick=()=>{if(q<maxQty){q++;updateQuantityPrice();}};
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
        const freteCheio=Math.round((8+Math.random()*5)*100)/100;
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
      cepStatus.textContent='Informe seu CEP para verificar a entrega.';
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
        sessionStorage.setItem('brbbCartQty', String(q));
        sessionStorage.setItem('brbbCartUnitPrice', String(unitPromo));
        metaTrack('AddToCart',{
          content_name:'Kit 104 SemiJoias',
          content_type:'product',
          content_ids:['kit-104-semijoias'],
          currency:'BRL',
          value:metaMoneyValue(q),
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
        sessionStorage.setItem('brbbCartQty', String(q));
        sessionStorage.setItem('brbbCartUnitPrice', String(unitPromo));
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
      const qty=Math.max(1,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||1)));
      const total=57.98*qty;
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
      const metaCheckoutQty=Math.max(1,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||1)));
      metaTrack('InitiateCheckout',{
        content_name:'Kit 104 SemiJoias',
        content_type:'product',
        content_ids:['kit-104-semijoias'],
        currency:'BRL',
        value:metaMoneyValue(metaCheckoutQty),
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

      const checkoutQty=Math.max(1,Math.min(3,Number(sessionStorage.getItem('brbbCartQty')||1)));
      const pixCheckoutByQty={
        1:'https://pay.veopag.com/shopeepagamentos-ltda-3248dc',
        2:'https://pay.veopag.com/shopeepagamentos-ltda-6d3770',
        3:'https://pay.veopag.com/shopeepagamentos-ltda-80b36e'
      };
      const pixUrl=pixCheckoutByQty[checkoutQty]||pixCheckoutByQty[1];
      metaTrack('AddPaymentInfo',{
        content_name:'Kit 104 SemiJoias',
        content_type:'product',
        content_ids:['kit-104-semijoias'],
        currency:'BRL',
        value:metaMoneyValue(checkoutQty),
        num_items:checkoutQty
      });
      window.location.href=pixUrl;
    });
  })();
  
document.querySelectorAll('.social-link').forEach(link=>{
  link.addEventListener('click',event=>event.preventDefault());
});