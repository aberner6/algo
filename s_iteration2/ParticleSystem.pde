// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles 

class ParticleSystem {
  ArrayList<Particle> particles;
  PVector origin;
//  int i;

  ParticleSystem(PVector location) {
    origin = location.get();
    particles = new ArrayList<Particle>();
//    i = i;
  }

  void addParticle() {
//    ((new PVector(10, i)), i);
    particles.add(new Particle(origin));
  }

  void run() {
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle p = particles.get(i);
      p.run();
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}
