<template>
  <div>
    <!-- 等待登陆-->
    <div id="app" v-if="location == 'loginPage'">
      <b-card
        header="OrderManager"
        header-border-variant="info"
        border-variant="info"
        align="center"
        class="speace shadow"
      >
        <b-row>
          <b-col> </b-col>
          <b-col>
            <h4>账户</h4>
            <b-input v-model="username"></b-input>
            <h4>密码</h4>
            <b-input v-model="password" type="password"></b-input>
            <br />
            <b-button @click="login" variant="success">login</b-button>
          </b-col>
          <b-col> </b-col>
        </b-row>
      </b-card>
    </div>
    <!-- 登陆成功 -->
    <div id="app" v-else-if="location == 'workBench'">
      <WorkBench :username="username" :makeToast="makeToast" :role="role" />
    </div>
  </div>
</template>

<script>
import WorkBench from "./components/WorkBench";
export default {
  name: "App",
  components: {
    WorkBench,
  },
  created: function () {
    // background
    document.querySelector("body").setAttribute("class", "bg textColor");
    if (this.$cookies.isKey("userStatus")) {
      let userStatus = this.$cookies.get("userStatus");
      if (userStatus.username) {
        this.logined = userStatus.logined;
        this.username = userStatus.username;
        this.password = userStatus.password;
        this.role = userStatus.role;
        this.location = userStatus.location;
        this.makeToast("Success!", "自动登陆成功！", "success");
      }
    }
  },

  methods: {
    login() {
      this.axios
        .post(
          "/api/",
          JSON.stringify({
            reason: "login",
            username: this.username,
            password: this.password,
          })
        )
        .then((response) => {
          let data = response.data;
          console.log(data);
          if (data.suc) {
            this.logined = true;
            this.location = "workBench";
            this.role = data.role;

            this.$cookies.set("userStatus", {
              logined: this.logined,
              username: this.username,
              role: data.role,
              location: "workBench",
            });

            this.makeToast("Notice!", "登陆成功！");
          } else {
            this.makeToast("Notice!", "登陆出错！！！！");
          }
        });
    },
    makeToast(title, content, variant = null) {
      this.$bvToast.toast(content, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  },

  data() {
    return {
      // dynamic datd
      logined: false,
      username: "",
      password: "",
      role: "",
      location: "loginPage",
    };
  },
};
</script>
<style>
.bg {
  /* background-color: darkslategray; */
}
.textColor {
  color: indianred;
}
.textHL {
  color: blueviolet;
}
.bgT {
  background-color: cadetblue;
}
.mainIcon {
  width: 15%;
}
.speaceX {
  margin-left: 2%;
  margin-right: 2%;
}

.speaceY {
  margin-top: 2%;
  margin-bottom: 2%;
}

.speace {
  margin: 5%;
}
.round {
  border-radius: 20px;
  /* border: 2px solid darkgray; */
  /* padding: 5px; */
}
.fullRound {
  border-radius: 50%;
}

.textCenter {
  text-align: center;
}
.pageCenter {
  position: absolute;
  margin: auto;
  width: 100%;
  top: 25%;
  left: 0;
  right: 0;
}
.shadow {
  box-shadow: 20px 20px 10px red;
}
body {
  background-color: darkgray;
}
.blur {
  background: hsla(0, 0%, 100%, 0.3);
}
</style>
