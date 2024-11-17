<script setup>
import HeaderWeb from '../components/functions/HeaderWeb.vue';
import BookSlider from '../components/functions/BookSlider.vue';
import FeaturedBook from '../components/functions/FeaturedBook.vue';
</script>

<template>
  <header>
    <HeaderWeb />
  </header>
  <div class="main-content">
    <h1 class="name">Book Store</h1>
    <h1 class="slogan">Enjoy your life!</h1>
    <p>Unlock Your Mind, Open a Book: Explore Worlds, Gain Knowledge, and Discover Yourself.</p>
  </div>
  <BookSlider />
  <section id="testimonial">
    <div class="container">
      <img
        src="../../assets/images/quote.png"
        alt=""
      />
      <h1>"Ideally, the book has no order at all and the reader must discover it for himself."</h1>
      <div class="profile">
        <img
          src="../../assets/images/profile.png"
          alt=""
        />
        <h4>Mark Twain</h4>
      </div>
    </div>
  </section>
  <FeaturedBook />
  <footer id="footer">
    <div
      class="container text-center"
      id="contact"
    >
      <div class="row">
        <div class="col">
          <h2>CONTACT US</h2>
        </div>
      </div>
      <div class="row">
        <div class="col m-2">
          <div class="col">
            <i class="fa-solid fa-envelope"></i> Email: binhb2111972@gmail.com <br />
            trucb2111964@gmail.com
          </div>
        </div>
        <div class="col m-2">
          <div class="col"><i class="fa-solid fa-phone"></i> Phone: (+84)234 567 890</div>
        </div>
        <div class="col m-2">
          <div class="col">
            <i class="fa-solid fa-city"></i> Address: Can Tho University, Ninh Kieu, Can Tho, Viet
            Nam
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-content {
  font-family: 'Satisfy';
  padding-top: 120px;
  background-image: url('../../assets/images/background.jpeg');
  background-position: center;
  background-size: cover;
  height: 600px;
  color: white;
  text-align: center;
}

.main-content .name {
  font-size: 50px;
}
.main-content .slogan {
  font-size: 110px;
}
.main-content p {
  font-size: 30px;
}

#testimonial {
  background: #ad8b73;
  width: 100%;
}

#testimonial .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 50px 16px;
}

#testimonial h1 {
  font-size: 30px;
  text-align: center;
}

#testimonial .profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#testimonial .profile img {
  max-width: 100px;
}

#footer {
  background-image: url('../../assets/images/contact.jpg');
  background-position: bottom center;
  background-size: cover;
  font-family: Verdana, sans-serif;
  color: white;
  text-align: center;
  padding: 10px;
  width: 100%;
  height: 200px;
}

#contact {
  margin-top: 25px;
}

/* Small devices */
@media (max-width: 480px) {
}

/* Medium devices */
@media (max-width: 768px) {
}

/* Large devices */
@media (max-width: 1024px) {
}
</style>