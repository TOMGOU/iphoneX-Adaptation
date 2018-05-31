<template>
    <transition name="loading-fade">
		<div class="spinnerWrap" v-if="visibel">
			<div class="spinner">
				<div class="bounce1"></div>
				<div class="bounce2"></div>
				<div class="bounce3"></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'loading',
	props: {
		visibel: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
.loading-fade-enter-active, .loading-fade-leave-active {
  transition: opacity .4s;
}
.loading-fade-enter, .loading-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.spinnerWrap {
    position: absolute;
    width:100%;
    height: 100%;
    left: 0;
    top:0;
    width: 6.7rem;
    height: 5.85rem;
    background-color: rgba(46,42,37,0.1);
    z-index: 9999;
}
.spinner {
    margin-top: -7px;
    margin-left: -75px;
    width: 150px;
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
}

.spinner > div {
    width: 15px;
    height: 15px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}

.spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}

@-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
    0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 40% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
      }
}
</style>


