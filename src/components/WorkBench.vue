
<template>
  <div>
    <h4 class="textCenter">
      你好,{{ role }}，{{ username }}！
      <b-badge size="sm" variant="success" @click="logout"> 登出 </b-badge>
    </h4>
    <!-- 角色功能区 -->
    <div v-if="role == 'boss'" class="textCenter speaceX"></div>
    <div v-if="role == 'store' || role == 'boss'" class="textCenter speaceX">
      <b-button
        size="sm"
      class="shadow"

        pill
        variant="primary "
        v-clipboard:copy="getAllReadyOrdersText"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        复制所有待发货信息
      </b-button>
      <br />
      <br />
    </div>

    <div v-if="role == 'saler' || role == 'boss'" class="textCenter speaceX">
      <b-card
        class="shadow"
        header="添加订单"
        header-border-variant="info"
        border-variant="info"
        align="center"
      >
        <div>
          <b-row>
            <b-col>
              <b-card border-variant="danger" class="shadow">
                <b-form-group label="重量">
                  <b-form-radio-group
                    v-model="selectedmass"
                    :options="mass"
                    plain
                    name="plain-inline1"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-card>
            </b-col>
            <b-col>
              <b-card border-variant="danger" class="shadow">
                <b-form-group label="大小">
                  <b-form-radio-group
                    v-model="selectedsize"
                    :options="size"
                    plain
                    name="plain-inline2"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-card>
            </b-col>
            <b-col>
              <b-card border-variant="danger" class="shadow">
                <b-form-group label="包装">
                  <b-form-radio-group
                    v-model="selectedpackaging"
                    :options="packaging"
                    plain
                    name="plain-inline3"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-card>
            </b-col>
          </b-row>
        </div>
        <br />
        <b-card border-variant="danger" class="shadow">
          收件信息（收件人，电话，地址）：
          <b-input v-model="orderInfo"></b-input>
        </b-card>
        <br />
        <b-button @click="addOrder" size="sm" pill variant="primary "
          >提交订单</b-button
        >
      </b-card>

      <br />
    </div>

    <!-- 订单表格 -->
    <b-table :fields="fields" striped hover :items="orders">
      <!-- 修改弹出 -->
      <template v-slot:row-details="row">
        <b-card>
          规格选择:
          <div>
            <b-row>
              <b-col>
                <b-form-group label="重量">
                  <b-form-radio-group
                    v-model="selectedmass"
                    :options="mass"
                    plain
                    name="plain-inline1"
                    :disabled="role == 'store'"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="大小">
                  <b-form-radio-group
                    v-model="selectedsize"
                    :options="size"
                    plain
                    name="plain-inline2"
                    :disabled="role == 'store'"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="包装">
                  <b-form-radio-group
                    v-model="selectedpackaging"
                    :options="packaging"
                    plain
                    name="plain-inline3"
                    :disabled="role == 'store'"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          收件信息：
          <b-input v-model="orderInfo" :disabled="role == 'store'"></b-input>
          快递单号：
          <b-input v-model="nowexpnum" :disabled="role == 'saler'"></b-input>

          <b-badge @click="updateOrder(row.item.id)" size="sm">保存</b-badge>
        </b-card>
      </template>
      <!-- 收货信息 -->
      <template v-slot:cell(info)="row">
        <p
          v-clipboard:copy="row.item.info"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          {{ row.item.info }}
        </p>
      </template>
      <!-- 快递单号 -->
      <template v-slot:cell(expnum)="row">
        <div v-if="row.item.expnum != ''">
          <span
            v-clipboard:copy="row.item.expnum"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            {{ row.item.expnum }}
          </span>
          <b-button size="sm" @click="rowEdit(row)" pill variant="primary ">
            {{ row.detailsShowing ? "取消" : "修改" }}
          </b-button>
        </div>

        <b-button size="sm" pill variant="danger" v-else> 待发货 </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "WorkBench",
  props: ["username", "makeToast", "role"],
  created: function () {
    this.getOrders();
    setInterval(() => {
      this.getOrders();
    }, 120000);
  },
  computed: {
    getAllReadyOrdersText: function () {
      let s = "";
      this.orders.forEach((order) => {
        if (order.expnum == "") {
          s +=
            "\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n" +
            order.info +
            "\n" +
            order.product;
          console.log(s);
        }
      });
      return s;
    },
  },
  methods: {
    makeProduct() {
      this.product =
        this.selectedsize +
        "-" +
        this.selectedmass +
        "-" +
        this.selectedpackaging;
    },
    rowEdit(row) {
      if (!row.detailsShowing) {
        let item = row.item;
        let product_d = item.product.split("-");
        this.selectedsize = product_d[0];
        this.selectedmass = product_d[1];
        this.selectedpackaging = product_d[2];
        this.orderInfo = item.info;
        this.nowexpnum = item.expnum;

        console.log(this.selectedsize);
        console.log(this.selectedmass);
        console.log(this.selectedpackaging);
        console.log(this.orderInfo);
        console.log(this.nowexpnum);
      }
      row.toggleDetails();
    },
    onCopy() {
      this.makeToast("Success!", "复制成功！", "success");
    },
    onError() {
      this.makeToast("Error!", "复制失败！请手动复制！", "danger");
    },
    logout() {
      this.$cookies.remove("userStatus");
      location.reload();
    },
    getOrders() {
      this.axios
        .post(
          "/api/",
          JSON.stringify({
            reason: "getOrders",
            username: this.username,
          })
        )
        .then((response) => {
          let data = response.data;
          console.log(data);
          if (!data.suc) {
            this.makeToast("Error!", "订单载入出错！！！！", "danger");
          } else {
            this.orders = data.orders;
            this.orders = [];
            data.orders.forEach((order) => {
              let date = new Date(order.addtime * 1000);
              order.addtime = date.toLocaleString("zh-CN", { hour12: false });
              order._rowVariant = "info";
              this.orders.push(order);
              let product_d = Number(
                order.product.split("-")[1].split("斤")[0]
              );

              if (!isNaN(product_d)) {
                this.totalmass = this.totalmass + product_d;
                console.log(this.totalmass);
              } else {
                this.makeToast("Error!", "某项数据有误！！！！", "danger");
              }

              console.log(this.totalmass);
            });
          }
        });
    },
    addOrder() {
      this.makeProduct();
      this.axios
        .post(
          "/api/",
          JSON.stringify({
            reason: "addOrder",
            saler: this.username,
            info: this.orderInfo,
            product: this.product,
          })
        )
        .then((response) => {
          let data = response.data;
          console.log(data);
          if (data.suc) {
            this.makeToast("Success!", "添加成功！", "success");
            this.getOrders();
          } else {
            this.makeToast(
              "Error!",
              "订单添加出错！！！！\n" + data.reason,
              "danger"
            );
          }
        });
    },
    updateOrder(noworderid) {
      this.makeProduct();
      let senddata = {
        reason: "updateOrder",
        orderId: noworderid,
        expnum: this.nowexpnum,
        product: this.product,
        info: this.orderInfo,
      };
      this.axios.post("/api/", JSON.stringify(senddata)).then((response) => {
        let data = response.data;
        console.log(data);
        if (data.suc) {
          this.makeToast("Success!", "保存成功！", "success");
          this.getOrders();
        } else {
          this.makeToast("Error!", "保存出错！！！\n" + data.reason, "danger");
        }
      });
    },
  },
  data() {
    return {
      mass: [
        { text: "5斤", value: "5斤" },
        { text: "10斤", value: "10斤" },
      ],
      packaging: [
        { text: "非礼盒", value: "非礼盒" },
        { text: "礼盒", value: "礼盒" },
      ],
      size: [
        { text: "大", value: "大" },
        { text: "中", value: "中" },
        { text: "小", value: "小" },
        { text: "次桃", value: "次桃" },
      ],
      // editing data
      selectedmass: "",
      selectedsize: "",
      selectedpackaging: "",
      orderInfo: "",
      product: "",
      nowexpnum: "",
      noworderid: "",
      // table info control
      fields: [
        {
          key: "addtime",
          sortable: true,
          variant: "primary",
        },
        {
          key: "saler",
          sortable: true,
          variant: "primary",
        },
        {
          key: "info",
          sortable: true,
          variant: "primary",
        },
        {
          key: "product",
          sortable: true,
          variant: "primary",
        },
        {
          key: "expnum",
          sortable: true,
          variant: "primary",
        },
      ],
      orders: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
