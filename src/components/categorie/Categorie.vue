<template>
  <section>
      <b-collapse :open="false" aria-id="contentIdForA11y1">
         <button
                class="button is-white is-large cardcategorie"
                slot="trigger"
                style=""
                aria-controls="contentIdForA11y1">Click me!</button>
         <div class="notification">
                <div class="content">
                    <h3>
                        Subtitle
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                        Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                    </p>
                </div>
         </div>
      </b-collapse>
  </section>
</template>

<script>
export default {
    
}
</script>

<style>
.cardcategorie {
    position: relative;
    margin: 50px;
    padding: 50px;
}
</style>