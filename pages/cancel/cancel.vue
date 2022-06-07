<template>
  <section id="hero">
      <v-row align="center" justify="center"  class="row-height">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <span class="input input--haruki">
                  Payment is successful</span>

            </v-col>
          </v-row>
        </v-col>
      </v-row>
  </section>
</template>

<script>


export default {
  name: 'PaymentCancel'
  
};
</script>

<style lang="scss">
.row-height {
  height: 750px;
}
@media screen and (max-width: 1020px) {
  .row-height {
    height: 450px;
  }
}
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}
.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;
  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }
  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;
      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2rem;
  width: 100%;
  overflow: hidden;
}
#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}
.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}
.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}
.card h1 {
  margin-bottom: 10px;
}
.zoom-efect {
  transform: scale(1.1);
}
.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
.input--haruki {
  margin: 4em 1em 1em;
}

.input__field--haruki {
  padding: 0.4em 0.25em;
  width: 100%;
  background: transparent;
  color: #FFF;
  font-size: 1.55em;
}

.input__label--haruki {
  position: absolute;
  width: 100%;
  text-align: left;
  pointer-events: none;
}

.input__label-content--haruki {
  transition: transform 0.3s;
}

.input__label--haruki::before,
.input__label--haruki::after {
  content: '';
  position: absolute;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 4px;
  background: #FFF;
  transition: transform 0.3s;
}

.input__label--haruki::before {
  top: 0;
}

.input__label--haruki::after {
  bottom: 0;
}

.input__field--haruki:focus + .input__label--haruki .input__label-content--haruki,
.input--filled .input__label-content--haruki {
  transform: translate3d(0, -90%, 0);
}

.input__field--haruki:focus + .input__label--haruki::before,
.input--filled .input__label--haruki::before {
  transform: translate3d(0, -0.5em, 0);
}

.input__field--haruki:focus + .input__label--haruki::after,
.input--filled .input__label--haruki::after {
  transform: translate3d(0, 0.5em, 0);
}
</style>

<style>
section {
  position: relative;
}
</style>
