import { Chart } from "@/components/ui/chart"
$(document).ready(() => {
  // Get PR ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const prId = urlParams.get("id")

  if (!prId) {
    window.location.href = "index.html"
    return
  }

  // Load PR details
  $.ajax({
    url: `/api/pull-requests/${prId}`,
    method: "GET",
    dataType: "json",
    success: (data) => {
      // Update page title and PR header
      document.title = `#${data.number} ${data.title} - Bitcoin Core Explorer`
      $("#pr-title").text(`#${data.number} ${data.title}`)

      // Format dates
      const openedDate = new Date(data.openedAt).toLocaleDateString()
      let statusInfo = `Opened on ${openedDate} by ${data.author.name}`

      if (data.status === "closed" && data.closedAt) {
        statusInfo += ` • Closed on ${new Date(data.closedAt).toLocaleDateString()}`
      } else if (data.status === "merged" && data.mergedAt) {
        statusInfo += ` • Merged on ${new Date(data.mergedAt).toLocaleDateString()}`
      }

      $("#pr-meta").text(statusInfo)

      // Display PR description
      if (data.description) {
        $("#pr-description").html(formatDescription(data.description))
      } else {
        $("#pr-description").text("No description provided.")
      }
    },
    error: (xhr, status, error) => {
      console.error("Error loading pull request details:", error)
      $("#pr-title").text("Error loading pull request")
      $("#pr-description").text("Could not load pull request details. Please try again later.")
    },
  })

  // Load PR contributors
  $.ajax({
    url: `/api/pull-requests/${prId}/contributors`,
    method: "GET",
    dataType: "json",
    success: (data) => {
      const $contributorsList = $("#contributors-list")
      $contributorsList.empty()

      if (data.length === 0) {
        $contributorsList.append('<li class="list-group-item">No contributors found</li>')
        return
      }

      data.forEach((contributor) => {
        $contributorsList.append(`
                    <li class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${contributor.name}</strong><br>
                                <small class="text-muted">${contributor.email}</small>
                            </div>
                            <span class="badge bg-primary rounded-pill">${contributor.contributionPercentage}%</span>
                        </div>
                    </li>
                `)
      })

      // Create contribution chart
      createContributionChart(data)
    },
    error: (xhr, status, error) => {
      console.error("Error loading contributors:", error)
      $("#contributors-list").html('<li class="list-group-item">Error loading contributors</li>')
    },
  })

  // Load PR commits
  $.ajax({
    url: `/api/pull-requests/${prId}/commits`,
    method: "GET",
    dataType: "json",
    success: (data) => {
      const $commitsList = $("#commits-list")
      $commitsList.empty()

      if (data.length === 0) {
        $commitsList.append('<div class="list-group-item">No commits found</div>')
        return
      }

      data.forEach((commit) => {
        const commitDate = new Date(commit.createdAt).toLocaleDateString()
        const shortHash = commit.hash.substring(0, 7)

        const $commitItem = $(`
                    <div class="commit-item" data-commit-id="${commit.id}">
                        <div class="list-group-item">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">${commit.shortDescription}</h6>
                                <small class="text-muted">${shortHash}</small>
                            </div>
                            <small>By ${commit.author.name} on ${commitDate}</small>
                        </div>
                        <div class="commit-details" id="commit-details-${commit.id}">
                            <div class="mb-3">
                                <strong>Author:</strong> ${commit.author.name} (${commit.author.email})
                            </div>
                            ${
                              commit.coAuthors.length > 0
                                ? `
                                <div class="mb-3">
                                    <strong>Co-authors:</strong>
                                    <ul class="mb-0">
                                        ${commit.coAuthors
                                          .map(
                                            (coAuthor) => `
                                            <li>${coAuthor.name} (${coAuthor.email})</li>
                                        `,
                                          )
                                          .join("")}
                                    </ul>
                                </div>
                            `
                                : ""
                            }
                            <div class="mb-3">
                                <strong>Description:</strong>
                                <p class="mb-0">${commit.longDescription || "No detailed description provided."}</p>
                            </div>
                            <div class="mb-3">
                                <strong>Changes:</strong>
                                <div class="text-center">
                                    <button class="btn btn-sm btn-outline-secondary load-changes" data-commit-id="${commit.id}">
                                        Load changes
                                    </button>
                                </div>
                                <div id="changes-${commit.id}" class="mt-2"></div>
                            </div>
                        </div>
                    </div>
                `)

        $commitsList.append($commitItem)
      })

      // Toggle commit details on click
      $(".commit-item").on("click", function (e) {
        if ($(e.target).hasClass("load-changes") || $(e.target).closest(".load-changes").length) {
          return // Don't toggle if clicking the load changes button
        }

        const commitId = $(this).data("commit-id")
        $(`#commit-details-${commitId}`).slideToggle()
      })

      // Load commit changes on button click
      $(".load-changes").on("click", function () {
        const commitId = $(this).data("commit-id")
        const $changesContainer = $(`#changes-${commitId}`)

        if ($changesContainer.data("loaded")) {
          return
        }

        $(this).prop("disabled", true).text("Loading...")

        $.ajax({
          url: `/api/commits/${commitId}/changes`,
          method: "GET",
          dataType: "json",
          success: function (data) {
            $changesContainer.empty()

            if (data.changes.length === 0) {
              $changesContainer.html('<p class="text-muted">No changes found</p>')
              return
            }

            data.changes.forEach((change) => {
              $changesContainer.append(`
                                <div class="mb-3">
                                    <strong>${change.filename}</strong>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <div class="code-diff code-removed">
                                                ${change.removedLines.join("\n") || "(No lines removed)"}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="code-diff code-added">
                                                ${change.addedLines.join("\n") || "(No lines added)"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `)
            })

            $changesContainer.data("loaded", true)
            $(this).text("Changes loaded").addClass("btn-success").removeClass("btn-outline-secondary")
          },
          error: function (xhr, status, error) {
            console.error("Error loading commit changes:", error)
            $changesContainer.html('<p class="text-danger">Error loading changes</p>')
            $(this).text("Error loading changes").addClass("btn-danger").removeClass("btn-outline-secondary")
          },
        })
      })
    },
    error: (xhr, status, error) => {
      console.error("Error loading commits:", error)
      $("#commits-list").html('<div class="list-group-item">Error loading commits</div>')
    },
  })

  // Load PR reviews
  $.ajax({
    url: `/api/pull-requests/${prId}/reviews`,
    method: "GET",
    dataType: "json",
    success: (data) => {
      const $reviewsList = $("#reviews-list")
      $reviewsList.empty()

      if (data.length === 0) {
        $reviewsList.append("<p>No reviews found</p>")
        return
      }

      data.forEach((review) => {
        let reviewClass = "review-neutral"
        if (review.hasACK) {
          reviewClass = "review-ack"
        } else if (review.hasNACK) {
          reviewClass = "review-nack"
        }

        const reviewDate = new Date(review.createdAt).toLocaleDateString()

        $reviewsList.append(`
                    <div class="review-item ${reviewClass}">
                        <div class="d-flex justify-content-between">
                            <strong>${review.reviewer.name}</strong>
                            <small>${reviewDate}</small>
                        </div>
                        <p class="mb-0 mt-2">${review.comment}</p>
                    </div>
                `)
      })
    },
    error: (xhr, status, error) => {
      console.error("Error loading reviews:", error)
      $("#reviews-list").html('<p class="text-danger">Error loading reviews</p>')
    },
  })

  // Helper function to format PR description
  function formatDescription(description) {
    // Simple markdown-like formatting
    return description
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
  }

  // Create contribution chart
  function createContributionChart(contributors) {
    const ctx = document.getElementById("contribution-chart").getContext("2d")

    const labels = contributors.map((c) => c.name)
    const data = contributors.map((c) => c.contributionPercentage)
    const backgroundColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8AC249",
      "#EA526F",
      "#25CCF7",
      "#FD7272",
      "#58B19F",
      "#182C61",
    ]

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors.slice(0, data.length),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                return `${label}: ${value}%`
              },
            },
          },
        },
      },
    })
  }
})

