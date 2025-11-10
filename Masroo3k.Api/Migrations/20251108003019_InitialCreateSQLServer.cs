using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Masroo3k.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateSQLServer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "_localizer["admin.templates"]",
                columns: table => new
                {
                    Id = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false)
                        .Annotation("_localizer["auto.20251108003019_InitialCreateSQLServer.aa269a05"]", "1, 1"),
                    Name = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.02bd0ece"]", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.80e986b3"]", maxLength: 280, nullable: true),
                    Category = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Duration = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    IsPopular = table.Column<bool>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.f67169df"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.46d295c8"] = table.Column<DateTime>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.dca44442"]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("_localizer["auto.20251108003019_InitialCreateSQLServer.b54fb917"]", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_localizer["admin.users"]",
                columns: table => new
                {
                    Id = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false)
                        .Annotation("_localizer["auto.20251108003019_InitialCreateSQLServer.aa269a05"]", "1, 1"),
                    Name = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Email = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.47b2e8f4"]", nullable: false),
                    PasswordHash = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Role = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.46d295c8"] = table.Column<DateTime>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.dca44442"]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("_localizer["auto.20251108003019_InitialCreateSQLServer.94ac0396"]", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.c271c1ac"]",
                columns: table => new
                {
                    Id = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false)
                        .Annotation("_localizer["auto.20251108003019_InitialCreateSQLServer.aa269a05"]", "1, 1"),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.ef4a6b2d"] = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    StageNumber = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    FieldOrder = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    Label = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.02bd0ece"]", maxLength: 100, nullable: false),
                    InputType = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    FieldOptions = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true),
                    Rationale = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.722bbc65"]", maxLength: 1000, nullable: false),
                    IsRequired = table.Column<bool>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.f67169df"]", nullable: false),
                    MinLength = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: true),
                    MaxLength = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: true),
                    MustBePositive = table.Column<bool>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.f67169df"]", nullable: false),
                    MustBeValidUrl = table.Column<bool>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.f67169df"]", nullable: false),
                    MustBeBetween0And100 = table.Column<bool>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.f67169df"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.46d295c8"] = table.Column<DateTime>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.dca44442"]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("_localizer["auto.20251108003019_InitialCreateSQLServer.044ddb7d"]", x => x.Id);
                    table.ForeignKey(
                        name: "_localizer["auto.20251108003019_InitialCreateSQLServer.0c0a30f7"]",
                        column: x => x._localizer["auto.20251108003019_InitialCreateSQLServer.ef4a6b2d"],
                        principalTable: "_localizer["admin.templates"]",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.8a7f7338"]",
                columns: table => new
                {
                    Id = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false)
                        .Annotation("_localizer["auto.20251108003019_InitialCreateSQLServer.aa269a05"]", "1, 1"),
                    Action = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.47b2e8f4"]", nullable: false),
                    EntityType = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    EntityId = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: true),
                    Description = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Details = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true),
                    IpAddress = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    UserAgent = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.46d295c8"] = table.Column<DateTime>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.dca44442"]", nullable: false),
                    Severity = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.47b2e8f4"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.4733e94f"] = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("_localizer["auto.20251108003019_InitialCreateSQLServer.90999bce"]", x => x.Id);
                    table.ForeignKey(
                        name: "_localizer["auto.20251108003019_InitialCreateSQLServer.726ce045"]",
                        column: x => x._localizer["auto.20251108003019_InitialCreateSQLServer.4733e94f"],
                        principalTable: "_localizer["admin.users"]",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "_localizer["admin.analyses"]",
                columns: table => new
                {
                    Id = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false)
                        .Annotation("_localizer["auto.20251108003019_InitialCreateSQLServer.aa269a05"]", "1, 1"),
                    Title = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Content = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true),
                    Score = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    RiskLevel = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    SuccessPercent = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    Investment = table.Column<decimal>(type: "_localizer["auto.AppDbContext.e246d6fa"]", nullable: false),
                    ExpectedROI = table.Column<decimal>(type: "_localizer["auto.AppDbContext.e246d6fa"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.46d295c8"] = table.Column<DateTime>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.dca44442"]", nullable: false),
                    ExecutiveSummary = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true),
                    KeyFindings = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true),
                    Recommendations = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.4908588c"] = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.ef4a6b2d"] = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("_localizer["auto.20251108003019_InitialCreateSQLServer.c4ffd76d"]", x => x.Id);
                    table.ForeignKey(
                        name: "_localizer["auto.20251108003019_InitialCreateSQLServer.42956537"]",
                        column: x => x._localizer["auto.20251108003019_InitialCreateSQLServer.ef4a6b2d"],
                        principalTable: "_localizer["admin.templates"]",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "_localizer["auto.20251108003019_InitialCreateSQLServer.7625553f"]",
                        column: x => x._localizer["auto.20251108003019_InitialCreateSQLServer.4908588c"],
                        principalTable: "_localizer["admin.users"]",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "_localizer["notifications.title"]",
                columns: table => new
                {
                    Id = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false)
                        .Annotation("_localizer["auto.20251108003019_InitialCreateSQLServer.aa269a05"]", "1, 1"),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.4733e94f"] = table.Column<int>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.fa7153f7"]", nullable: false),
                    Title = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Message = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    Type = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.f13857fd"] = table.Column<bool>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.f67169df"]", nullable: false),
                    _localizer["auto.20251108003019_InitialCreateSQLServer.46d295c8"] = table.Column<DateTime>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.dca44442"]", nullable: false),
                    ActionUrl = table.Column<string>(type: "_localizer["auto.20251108003019_InitialCreateSQLServer.d78cbc7b"]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("_localizer["auto.20251108003019_InitialCreateSQLServer.d68bd512"]", x => x.Id);
                    table.ForeignKey(
                        name: "_localizer["auto.20251108003019_InitialCreateSQLServer.320d5794"]",
                        column: x => x._localizer["auto.20251108003019_InitialCreateSQLServer.4733e94f"],
                        principalTable: "_localizer["admin.users"]",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.25be0383"]",
                table: "_localizer["auto.20251108003019_InitialCreateSQLServer.8a7f7338"]",
                column: "_localizer["auto.20251108003019_InitialCreateSQLServer.004bf6c9"]");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.dacc1f29"]",
                table: "_localizer["auto.20251108003019_InitialCreateSQLServer.8a7f7338"]",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.f66bab35"]",
                table: "_localizer["auto.20251108003019_InitialCreateSQLServer.8a7f7338"]",
                column: "_localizer["auto.20251108003019_InitialCreateSQLServer.007cc954"]");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.64366e49"]",
                table: "_localizer["auto.20251108003019_InitialCreateSQLServer.8a7f7338"]",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.5dc63000"]",
                table: "_localizer["admin.analyses"]",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.4c0e2b5b"]",
                table: "_localizer["admin.analyses"]",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.f782f3c0"]",
                table: "_localizer["notifications.title"]",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.4fba468f"]",
                table: "_localizer["notifications.title"]",
                column: "IsRead");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.b6012374"]",
                table: "_localizer["notifications.title"]",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.7f16caef"]",
                table: "_localizer["auto.20251108003019_InitialCreateSQLServer.c271c1ac"]",
                columns: new[] { "_localizer["auto.20251108003019_InitialCreateSQLServer.ef4a6b2d"]", "StageNumber", "FieldOrder" });

            migrationBuilder.CreateIndex(
                name: "_localizer["auto.20251108003019_InitialCreateSQLServer.9cc2bb27"]",
                table: "_localizer["admin.users"]",
                column: "_localizer["auto.20251108003019_InitialCreateSQLServer.ce8ae9da"]",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.DropTable(
                name: "_localizer["admin.analyses"]");

            migrationBuilder.DropTable(
                name: "_localizer["notifications.title"]");

            migrationBuilder.DropTable(
                name: "TemplateFields");

            migrationBuilder.DropTable(
                name: "_localizer["admin.users"]");

            migrationBuilder.DropTable(
                name: "_localizer["admin.templates"]");
        }
    }
}
